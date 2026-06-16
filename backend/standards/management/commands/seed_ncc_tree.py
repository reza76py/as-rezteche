"""
Management command: seed_ncc_tree
Seeds NCC Volume One and Two tree data into the NCCNode database table.

Usage:
  python manage.py seed_ncc_tree --force             # clear and reseed everything
  python manage.py seed_ncc_tree --section B         # reseed only Section B (Volume One)
  python manage.py seed_ncc_tree --skip-if-exists    # no-op if nodes already exist
"""

from django.core.management.base import BaseCommand
from standards.models import NCCNode

from .ncc_data.v1_section_a import SECTION_A
from .ncc_data.v1_section_b import SECTION_B
from .ncc_data.v1_section_c import SECTION_C
from .ncc_data.v1_section_d import SECTION_D
from .ncc_data.v1_section_e import SECTION_E
from .ncc_data.v1_section_f import SECTION_F
from .ncc_data.v1_section_g import SECTION_G
from .ncc_data.v1_section_i import SECTION_I
from .ncc_data.v1_section_j import SECTION_J
from .ncc_data.v2_section_a import V2_SECTION_A
from .ncc_data.v2_section_h import V2_SECTION_H

VOLUME_ONE = {
    "id": "root",
    "title": "NCC Volume One",
    "subtitle": "Class 2 to Class 9",
    "color": "#6366F1",
    "is_root": True,
    "children": [
        SECTION_A,
        SECTION_B,
        SECTION_C,
        SECTION_D,
        SECTION_E,
        SECTION_F,
        SECTION_G,
        SECTION_I,
        SECTION_J,
    ],
}

VOLUME_TWO = {
    "id": "root2",
    "title": "NCC Volume Two",
    "subtitle": "Class 1 and Class 10 buildings",
    "color": "#06b6d4",
    "is_root": True,
    "children": [
        V2_SECTION_A,
        V2_SECTION_H,
    ],
}

# Map section IDs to their data dicts (for --section argument)
V1_SECTIONS = {
    "A": SECTION_A,
    "B": SECTION_B,
    "C": SECTION_C,
    "D": SECTION_D,
    "E": SECTION_E,
    "F": SECTION_F,
    "G": SECTION_G,
    "I": SECTION_I,
    "J": SECTION_J,
}

V2_SECTIONS = {
    "V2-A": V2_SECTION_A,
    "V2-H": V2_SECTION_H,
}


# ── Recursive DB writer ───────────────────────────────────────────────────────

def create_node(data, volume, parent=None, order=0):
    node = NCCNode.objects.create(
        node_id         = data["id"],
        title           = data["title"],
        subtitle        = data.get("subtitle", ""),
        color           = data.get("color", "#6366F1"),
        volume          = volume,
        parent          = parent,
        order           = order,
        desc            = data.get("desc", ""),
        example         = data.get("example", ""),
        photo_url       = data.get("photo_url", ""),
        why             = data.get("why", ""),
        calculator_type = data.get("calculator_type", ""),
        standard        = data.get("standard", ""),
        bss             = data.get("bss", False),
        is_root         = data.get("is_root", False),
    )
    for i, child in enumerate(data.get("children", [])):
        create_node(child, volume, parent=node, order=i)
    return node


class Command(BaseCommand):
    help = "Seed NCC Volume One and Two tree data into the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--skip-if-exists",
            action="store_true",
            help="Skip seeding if nodes already exist (safe for production deploys)",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Force re-seed even if nodes exist (WARNING: clears all existing nodes)",
        )
        parser.add_argument(
            "--section",
            type=str,
            metavar="SECTION_ID",
            help=(
                "Reseed a single section only (e.g. B, F, J, V2-H). "
                "Deletes and recreates only that section's subtree. "
                "The parent volume root node must already exist."
            ),
        )

    def handle(self, *_args, **kwargs):
        section_id = kwargs.get("section")

        # ── Single-section reseed ─────────────────────────────────────────────
        if section_id:
            section_id = section_id.upper()
            if section_id in V1_SECTIONS:
                section_data = V1_SECTIONS[section_id]
                volume = 1
            elif section_id in V2_SECTIONS:
                section_data = V2_SECTIONS[section_id]
                volume = 2
            else:
                self.stderr.write(
                    self.style.ERROR(
                        f"Unknown section '{section_id}'. "
                        f"Valid options: {', '.join(list(V1_SECTIONS) + list(V2_SECTIONS))}"
                    )
                )
                return

            # Delete existing nodes for this section subtree
            try:
                existing = NCCNode.objects.get(node_id=section_data["id"], volume=volume)
                existing.delete()
                self.stdout.write(f"Deleted existing subtree for section '{section_id}'.")
            except NCCNode.DoesNotExist:
                self.stdout.write(f"No existing subtree found for section '{section_id}'.")

            # Find the volume root to attach to
            root_id = "root" if volume == 1 else "root2"
            try:
                volume_root = NCCNode.objects.get(node_id=root_id)
            except NCCNode.DoesNotExist:
                self.stderr.write(
                    self.style.ERROR(
                        f"Volume {volume} root node ('{root_id}') not found. "
                        "Run --force first to seed the full tree."
                    )
                )
                return

            # Determine order by position in the sections list
            all_section_ids = list(V1_SECTIONS.keys()) if volume == 1 else list(V2_SECTIONS.keys())
            order = all_section_ids.index(section_id) if section_id in all_section_ids else 99

            create_node(section_data, volume=volume, parent=volume_root, order=order)
            count = NCCNode.objects.filter(volume=volume).count()
            self.stdout.write(
                self.style.SUCCESS(
                    f"Done. Section '{section_id}' reseeded. Volume {volume} now has {count} nodes."
                )
            )
            return

        # ── Full reseed ───────────────────────────────────────────────────────
        existing = NCCNode.objects.count()

        if existing > 0 and kwargs["skip_if_exists"]:
            self.stdout.write(
                self.style.WARNING(
                    f"Skipping seed — {existing} nodes already exist. Use --force to override."
                )
            )
            return

        if existing > 0 and not kwargs["force"]:
            self.stdout.write(
                self.style.WARNING(
                    f"{existing} nodes already exist. Use --skip-if-exists to skip, or --force to overwrite."
                )
            )
            return

        self.stdout.write("Clearing existing NCC nodes...")
        NCCNode.objects.all().delete()

        self.stdout.write("Seeding Volume One...")
        create_node(VOLUME_ONE, volume=1)

        self.stdout.write("Seeding Volume Two...")
        create_node(VOLUME_TWO, volume=2)

        v1_count = NCCNode.objects.filter(volume=1).count()
        v2_count = NCCNode.objects.filter(volume=2).count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Volume One: {v1_count} nodes. Volume Two: {v2_count} nodes."
            )
        )
