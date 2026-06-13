from django.db import models


class Standard(models.Model):
    code = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    full_description = models.TextField()
    priority = models.CharField(max_length=20, choices=[
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ], default='medium')

    def __str__(self):
        return f"{self.code} - {self.title}"


class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Product categories'


class RoomType(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class BuildingClass(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"Class {self.code} - {self.name}"

    class Meta:
        verbose_name_plural = 'Building classes'


class ComplianceRule(models.Model):
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE, related_name='rules')
    building_classes = models.ManyToManyField(BuildingClass, blank=True)
    room_types = models.ManyToManyField(RoomType, blank=True)
    product_categories = models.ManyToManyField(ProductCategory, blank=True)
    requirement = models.TextField()
    key_numbers = models.TextField(blank=True)
    reason = models.TextField(blank=True)

    def __str__(self):
        return f"{self.standard.code} - {self.requirement[:60]}"


class NCCNode(models.Model):
    """
    Represents a single node in the NCC Volume One or Two tree.
    Uses a self-referencing parent to build the full tree hierarchy.
    """
    VOLUME_CHOICES = [
        (1, 'Volume One'),
        (2, 'Volume Two'),
    ]

    node_id   = models.CharField(max_length=50, unique=True)          # e.g. 'F2', 'F2-D', 'F2-AS1'
    title     = models.CharField(max_length=200)                       # e.g. 'Part F2'
    subtitle  = models.CharField(max_length=200, blank=True)           # e.g. 'Wet areas'
    color     = models.CharField(max_length=20, default='#6366F1')     # hex color
    volume    = models.IntegerField(choices=VOLUME_CHOICES, default=1)
    parent    = models.ForeignKey(
                    'self',
                    null=True,
                    blank=True,
                    on_delete=models.CASCADE,
                    related_name='children'
                )
    order     = models.IntegerField(default=0)                         # display order among siblings
    desc      = models.TextField(blank=True)                           # optional description
    # ── 4-layer content ───────────────────────────────────────────────────────
    desc      = models.TextField(blank=True)          # plain English summary
    example   = models.TextField(blank=True)          # real world example
    photo_url = models.URLField(max_length=500, blank=True)  # illustrative image
    why       = models.TextField(blank=True)          # why this rule exists
 
    # ── Metadata ──────────────────────────────────────────────────────────────
    standard  = models.CharField(max_length=200, blank=True)           # e.g. 'AS 3740, AS 2588'
    bss       = models.BooleanField(default=False)                     # BSS role relevant flag
    is_root   = models.BooleanField(default=False)                     # marks the root node per volume

    class Meta:
        ordering = ['volume', 'order']
        verbose_name = 'NCC Node'
        verbose_name_plural = 'NCC Nodes'

    def __str__(self):
        return f"Vol {self.volume} | {self.node_id} — {self.title}"