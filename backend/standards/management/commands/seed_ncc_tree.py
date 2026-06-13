"""
Management command: seed_ncc_tree
Migrates all hardcoded NCC tree data from VolumePage.jsx into the NCCNode database table.
Run with: python manage.py seed_ncc_tree
Safe to re-run — clears existing nodes first.
"""

from django.core.management.base import BaseCommand
from standards.models import NCCNode

# ── Raw tree data (mirrors VolumePage.jsx exactly) ────────────────────────────

VOLUME_ONE = {
    "id": "root",
    "title": "NCC Volume One",
    "subtitle": "Class 2 to Class 9",
    "color": "#6366F1",
    "is_root": True,
    "children": [
        {
            "id": "A",
            "title": "Section A",
            "subtitle": "Governing requirements",
            "color": "#6366F1",
            "children": [
                {'id': 'A1', 'title': 'Part A1', 'subtitle': 'Interpreting the NCC', 'color': '#6366F1', 'children': [
    {'id': 'A1-O', 'title': 'A1O1', 'subtitle': 'Objective', 'color': '#6366F1'},
    {'id': 'A1-P', 'title': 'A1P1', 'subtitle': 'Performance requirement', 'color': '#6366F1'},
    {'id': 'A1-D', 'title': 'A1D1', 'subtitle': 'DTS solution', 'color': '#6366F1'},
    {'id': 'A1G1', 'title': 'A1G1', 'subtitle': 'Scope of Volume One', 'color': '#6366F1',
     'desc': 'Volume One applies to all Class 2–9 buildings, disability access in Class 1b and 10a buildings, and certain Class 10b structures including accessible swimming pools.'},
    {'id': 'A1G2', 'title': 'A1G2', 'subtitle': 'Scope of Volume Two', 'color': '#6366F1',
     'desc': 'Volume Two applies to Class 1 and 10a buildings, certain Class 10b structures, and Class 10c private bushfire shelters.'},
    {'id': 'A1G3', 'title': 'A1G3', 'subtitle': 'Scope of Volume Three', 'color': '#6366F1',
     'desc': 'Volume Three covers plumbing and drainage systems in all building classes, applying from point of connection to point of discharge.'},
    {'id': 'A1G4', 'title': 'A1G4', 'subtitle': 'Interpretation', 'color': '#6366F1',
     'desc': 'Explains how to read the NCC — italicised words use Schedule 1 definitions, explanatory information is non-mandatory, and Application/Limitation/Exemption statements are mandatory.'},
]},
                {
                    "id": "A2",
                    "title": "Part A2",
                    "subtitle": "Compliance with the NCC",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "A2-O",
                            "title": "A2O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A2-P",
                            "title": "A2P1",
                            "subtitle": "Performance requirement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A2-D",
                            "title": "A2D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A2-G4",
                            "title": "A2G4",
                            "subtitle": "Combination of solutions",
                            "color": "#6366F1",
                        },
                    ],
                },
                {
                    "id": "A3",
                    "title": "Part A3",
                    "subtitle": "Application of the NCC in States and Territories",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "A3-O",
                            "title": "A3O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A3-D",
                            "title": "A3D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                        },
                    ],
                },
                {
                    "id": "A4",
                    "title": "Part A4",
                    "subtitle": "Referenced documents",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "A4-O",
                            "title": "A4O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A4-D",
                            "title": "A4D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                            "desc": "Lists all Australian Standards and other documents referenced throughout NCC Volume One. A referenced document becomes part of the NCC to the extent it is called up.",
                        },
                    ],
                },
                {
                    "id": "A5",
                    "title": "Part A5",
                    "subtitle": "Documentation of design and construction",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "A5-O",
                            "title": "A5O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A5-D",
                            "title": "A5D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                            "desc": "Requires documentation of all design decisions and construction methods. Evidence of suitability must be kept for all products and systems used.",
                        },
                    ],
                },
                {
                    "id": "A6",
                    "title": "Part A6",
                    "subtitle": "Building classification",
                    "color": "#6366F1",
                    "bss": True,
                    "children": [
                        {
                            "id": "A6-O",
                            "title": "A6O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A6-F",
                            "title": "A6F1",
                            "subtitle": "Functional statement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A6-P",
                            "title": "A6P1",
                            "subtitle": "Performance requirement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A6-D",
                            "title": "A6D1",
                            "subtitle": "DTS → Classes 1-10",
                            "color": "#6366F1",
                        },
                    ],
                },
                {
                    "id": "A7",
                    "title": "Part A7",
                    "subtitle": "United buildings",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "A7-O",
                            "title": "A7O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "A7-D",
                            "title": "A7D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                            "desc": "Applies when two or more buildings are united into one. The combined building must comply with the NCC as if it were a single building of the most demanding class.",
                        },
                    ],
                },
            ],
        },
        {
            "id": "B",
            "title": "Section B",
            "subtitle": "Structure",
            "color": "#888780",
            "children": [
                {
                    "id": "B1",
                    "title": "Part B1",
                    "subtitle": "Structural provisions",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "B1-O",
                            "title": "B1O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "B1-P",
                            "title": "B1P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "B1-D",
                            "title": "B1D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "B-S4",
                    "title": "Specification 4",
                    "subtitle": "Design of buildings in cyclonic areas",
                    "color": "#888780",
                    "desc": "Applies to buildings in cyclonic regions (QLD, WA, NT). Products including windows, doors, roofing and cladding must meet cyclonic wind ratings. Relevant wind regions: C and D in Queensland.",
                },
            ],
        },
        {
            "id": "C",
            "title": "Section C",
            "subtitle": "Fire resistance",
            "color": "#E24B4A",
            "children": [
                {
                    "id": "C1",
                    "title": "Part C1",
                    "subtitle": "Fire resistance",
                    "color": "#E24B4A",
                    "children": [
                        {
                            "id": "C1-O",
                            "title": "C1O1",
                            "subtitle": "Objective",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C1-P",
                            "title": "C1P1",
                            "subtitle": "Performance requirement",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C1-D",
                            "title": "C1D1",
                            "subtitle": "DTS → FRL ratings",
                            "color": "#E24B4A",
                        },
                    ],
                },
                {
                    "id": "C2",
                    "title": "Part C2",
                    "subtitle": "Stability",
                    "color": "#E24B4A",
                    "children": [
                        {
                            "id": "C2-O",
                            "title": "C2O1",
                            "subtitle": "Objective",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C2-P",
                            "title": "C2P1",
                            "subtitle": "Performance requirement",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C2-D",
                            "title": "C2D1",
                            "subtitle": "DTS solution",
                            "color": "#E24B4A",
                        },
                    ],
                },
                {
                    "id": "C3",
                    "title": "Part C3",
                    "subtitle": "Compartmentation and separation",
                    "color": "#E24B4A",
                    "children": [
                        {
                            "id": "C3-O",
                            "title": "C3O1",
                            "subtitle": "Objective",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C3-P",
                            "title": "C3P1",
                            "subtitle": "Performance requirement",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C3-D",
                            "title": "C3D1",
                            "subtitle": "DTS solution",
                            "color": "#E24B4A",
                        },
                    ],
                },
                {
                    "id": "C4",
                    "title": "Part C4",
                    "subtitle": "Protection of openings",
                    "color": "#E24B4A",
                    "children": [
                        {
                            "id": "C4-O",
                            "title": "C4O1",
                            "subtitle": "Objective",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C4-P",
                            "title": "C4P1",
                            "subtitle": "Performance requirement",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "C4-D",
                            "title": "C4D1",
                            "subtitle": "DTS solution",
                            "color": "#E24B4A",
                        },
                    ],
                },
                {
                    "id": "C-S5",
                    "title": "Specification 5",
                    "subtitle": "Fire-resisting construction",
                    "color": "#E24B4A",
                    "desc": "Detailed construction requirements for fire-resisting elements including walls, floors, columns and beams.",
                },
                {
                    "id": "C-S6",
                    "title": "Specification 6",
                    "subtitle": "Structural tests for lightweight construction",
                    "color": "#E24B4A",
                    "desc": "Test methods for determining fire resistance of lightweight construction elements.",
                },
                {
                    "id": "C-S7",
                    "title": "Specification 7",
                    "subtitle": "Fire hazard properties",
                    "color": "#E24B4A",
                    "desc": "Specifies fire hazard properties including ignitability, spread of flame, smoke and heat for materials used in buildings.",
                },
                {
                    "id": "C-S8",
                    "title": "Specification 8",
                    "subtitle": "Performance of external walls in fire",
                    "color": "#E24B4A",
                    "desc": "Requirements for external wall systems to resist fire spread. Relevant to cladding product selection — non-combustible cladding required on certain buildings.",
                },
                {
                    "id": "C-S9",
                    "title": "Specification 9",
                    "subtitle": "Cavity barriers for fire-protected timber",
                    "color": "#E24B4A",
                    "desc": "Specifies cavity barrier requirements within fire-protected timber construction systems.",
                },
                {
                    "id": "C-S10",
                    "title": "Specification 10",
                    "subtitle": "Fire-protected timber",
                    "color": "#E24B4A",
                    "desc": "Requirements for timber elements used in fire-resistance rated construction.",
                },
                {
                    "id": "C-S11",
                    "title": "Specification 11",
                    "subtitle": "Smoke-proof walls in health-care and residential care buildings",
                    "color": "#E24B4A",
                    "desc": "Construction requirements for smoke-proof walls in Class 9a buildings. Relevant to lining and partition product selection.",
                },
                {
                    "id": "C-S13",
                    "title": "Specification 13",
                    "subtitle": "Penetration of walls, floors and ceilings by services",
                    "color": "#E24B4A",
                    "desc": "Specifies how service penetrations through fire-rated elements must be sealed. Fire collars and intumescent products must maintain the FRL of the element.",
                },
                {
                    "id": "C-S12",
                    "title": "Specification 12",
                    "subtitle": "Fire doors, smoke doors, fire windows and shutters",
                    "color": "#E24B4A",
                    "desc": "Specifies construction and performance requirements for fire doors, smoke doors, fire windows and shutters. All fire doors must be tested and certified to the relevant FRL.",
                },
            ],
        },
        {
            "id": "D",
            "title": "Section D",
            "subtitle": "Access and egress",
            "color": "#378ADD",
            "children": [
                {
                    "id": "D1",
                    "title": "Part D1",
                    "subtitle": "Access and egress",
                    "color": "#378ADD",
                    "children": [
                        {
                            "id": "D1-O",
                            "title": "D1O1",
                            "subtitle": "Objective",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D1-P",
                            "title": "D1P1",
                            "subtitle": "Performance requirement",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D1-D",
                            "title": "D1D1",
                            "subtitle": "DTS solution",
                            "color": "#378ADD",
                        },
                    ],
                },
                {
                    "id": "D2",
                    "title": "Part D2",
                    "subtitle": "Provision for escape",
                    "color": "#378ADD",
                    "children": [
                        {
                            "id": "D2-O",
                            "title": "D2O1",
                            "subtitle": "Objective",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D2-P",
                            "title": "D2P1",
                            "subtitle": "Performance requirement",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D2-D",
                            "title": "D2D1",
                            "subtitle": "DTS solution",
                            "color": "#378ADD",
                        },
                    ],
                },
                {
                    "id": "D3",
                    "title": "Part D3",
                    "subtitle": "Construction of exits",
                    "color": "#378ADD",
                    "children": [
                        {
                            "id": "D3-O",
                            "title": "D3O1",
                            "subtitle": "Objective",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D3-P",
                            "title": "D3P1",
                            "subtitle": "Performance requirement",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D3-D",
                            "title": "D3D1",
                            "subtitle": "DTS solution",
                            "color": "#378ADD",
                        },
                    ],
                },
                {
                    "id": "D4",
                    "title": "Part D4",
                    "subtitle": "Disability access",
                    "color": "#378ADD",
                    "bss": True,
                    "children": [
                        {
                            "id": "D4-O",
                            "title": "D4O1",
                            "subtitle": "Objective",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D4-P",
                            "title": "D4P1",
                            "subtitle": "Performance requirement",
                            "color": "#378ADD",
                        },
                        {
                            "id": "D4-D",
                            "title": "D4D1",
                            "subtitle": "DTS → AS 1428.1",
                            "color": "#378ADD",
                            "standard": "AS 1428.1",
                            "children": [
                                {
                                    "id": "D4-AS",
                                    "title": "AS 1428.1",
                                    "subtitle": "Design for access and mobility",
                                    "color": "#06b6d4",
                                    "desc": "Sets minimum requirements for accessible building design — door widths (min 850mm clear), corridor widths, ramp gradients (1:14 max), and accessible path of travel from street to building entry.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "D-S14",
                    "title": "Specification 14",
                    "subtitle": "Non-required stairways, ramps and escalators",
                    "color": "#378ADD",
                    "desc": "Construction requirements for stairways, ramps and escalators that are not required as exits. Covers dimensions, handrails and slip resistance.",
                },
                {
                    "id": "D-S15",
                    "title": "Specification 15",
                    "subtitle": "Braille and tactile signs",
                    "color": "#378ADD",
                    "desc": "Requirements for braille and tactile signage in accessible buildings. Relevant to signage product selection for Class 5, 6, 9 buildings.",
                },
                {
                    "id": "D-S16",
                    "title": "Specification 16",
                    "subtitle": "Accessible water entry/exit from swimming pools",
                    "color": "#378ADD",
                    "desc": "Specifies requirements for accessible pool entry and exit including ramps, handrails and lift devices.",
                },
            ],
        },
        {
            "id": "E",
            "title": "Section E",
            "subtitle": "Services",
            "color": "#888780",
            "children": [
                {
                    "id": "E1",
                    "title": "Part E1",
                    "subtitle": "Fire fighting",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "E1-O",
                            "title": "E1O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "E1-P",
                            "title": "E1P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "E1-D",
                            "title": "E1D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "E2",
                    "title": "Part E2",
                    "subtitle": "Smoke hazard",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "E2-O",
                            "title": "E2O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "E2-P",
                            "title": "E2P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "E2-D",
                            "title": "E2D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "E3",
                    "title": "Part E3",
                    "subtitle": "Lift installations",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "E3-O",
                            "title": "E3O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "E3-P",
                            "title": "E3P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "E3-D",
                            "title": "E3D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "E4",
                    "title": "Part E4",
                    "subtitle": "Visibility in an emergency",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "E4-O",
                            "title": "E4O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "E4-P",
                            "title": "E4P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "E4-D",
                            "title": "E4D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "E-S17",
                    "title": "Specification 17",
                    "subtitle": "Fire sprinkler systems",
                    "color": "#888780",
                    "desc": "Covers design and installation requirements for automatic fire sprinkler systems. Applies to Class 2–9 buildings above certain heights and areas.",
                },
                {
                    "id": "E-S18",
                    "title": "Specification 18",
                    "subtitle": "Class 2 and 3 buildings up to 25m",
                    "color": "#888780",
                    "desc": "Simplified sprinkler provisions for Class 2 and 3 residential buildings not exceeding 25m effective height.",
                },
                {
                    "id": "E-S19",
                    "title": "Specification 19",
                    "subtitle": "Fire control centres",
                    "color": "#888780",
                    "desc": "Layout and equipment requirements for fire control centres in larger buildings. Covers signage, communications and access provisions.",
                },
                {
                    "id": "E-S20",
                    "title": "Specification 20",
                    "subtitle": "Smoke detection and alarm systems",
                    "color": "#888780",
                    "desc": "Technical requirements for smoke detection and alarm installations. Relevant to product selection for detection devices and alarm sounders.",
                },
                {
                    "id": "E-S21",
                    "title": "Specification 21",
                    "subtitle": "Smoke exhaust systems",
                    "color": "#888780",
                    "desc": "Engineering requirements for mechanical smoke exhaust systems in large enclosed spaces such as atria and shopping centres.",
                },
                {
                    "id": "E-S22",
                    "title": "Specification 22",
                    "subtitle": "Smoke-and-heat vents",
                    "color": "#888780",
                    "desc": "Requirements for passive smoke-and-heat venting systems including vent sizing and placement in single-storey warehouses and factories.",
                },
                {
                    "id": "E-S23",
                    "title": "Specification 23",
                    "subtitle": "Residential fire safety systems",
                    "color": "#888780",
                    "desc": "Outlines fire safety system requirements for residential buildings including smoke alarms, sprinklers and warning systems for Class 2 and 3 buildings.",
                },
                {
                    "id": "E-S24",
                    "title": "Specification 24",
                    "subtitle": "Lift installations",
                    "color": "#888780",
                    "desc": "Technical requirements for lift installations in buildings. Covers fire service lifts, stretcher lifts and general passenger lifts.",
                },
                {
                    "id": "E-S25",
                    "title": "Specification 25",
                    "subtitle": "Photoluminescent exit signs",
                    "color": "#888780",
                    "desc": "Performance and installation requirements for photoluminescent exit signs as an alternative to illuminated signs in certain building types.",
                },
            ],
        },
        {
            "id": "F",
            "title": "Section F",
            "subtitle": "Health and amenity",
            "color": "#1D9E75",
            "children": [
                {
                    "id": "F1",
                    "title": "Part F1",
                    "subtitle": "Surface water",
                    "color": "#1D9E75",
                    "children": [
                        {
                            "id": "F1-O",
                            "title": "F1O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F1-P",
                            "title": "F1P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F1-D",
                            "title": "F1D1",
                            "subtitle": "DTS → AS 4654.2",
                            "color": "#1D9E75",
                            "standard": "AS 4654.2",
                            "children": [
                                {
                                    "id": "F1-AS",
                                    "title": "AS 4654.2",
                                    "subtitle": "Waterproofing — external above-ground",
                                    "color": "#06b6d4",
                                    "desc": "Covers waterproofing membranes for external above-ground surfaces such as balconies and podiums. Membrane must extend minimum 100mm up vertical faces. All penetrations must be fully detailed.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "F2",
                    "title": "Part F2",
                    "subtitle": "Wet areas",
                    "color": "#1D9E75",
                    "bss": True,
                    "children": [
                        {
                            "id": "F2-O",
                            "title": "F2O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                            "desc": "Minimise risk of water from wet areas causing damage or unhealthy conditions.",
                        },
                        {
                            "id": "F2-F",
                            "title": "F2F1, F2F2",
                            "subtitle": "Functional statements",
                            "color": "#1D9E75",
                            "desc": "Building must protect against water damage and overflow from bathrooms and laundries.",
                        },
                        {
                            "id": "F2-P",
                            "title": "F2P1, F2P2",
                            "subtitle": "Performance requirements",
                            "color": "#1D9E75",
                            "desc": "Overflow from bathrooms must be prevented from reaching other units or public spaces.",
                        },
                        {
                            "id": "F2-D",
                            "title": "F2D1 → F2D2",
                            "subtitle": "DTS → AS 3740",
                            "color": "#1D9E75",
                            "standard": "AS 3740, AS 2588",
                            "desc": "Building elements in wet areas must be waterproof per Specification 26 and comply with AS 3740.",
                            "children": [
                                {
                                    "id": "F2-AS1",
                                    "title": "AS 3740",
                                    "subtitle": "Waterproofing of domestic wet areas",
                                    "color": "#06b6d4",
                                    "desc": "Zone 1: shower recess floor and walls to 1800mm. Zone 2: bathroom floor with 150mm upstand at walls. Products must be compatible with substrate and applied by a licensed waterproofer.",
                                },
                                {
                                    "id": "F2-AS2",
                                    "title": "AS 2588",
                                    "subtitle": "Gypsum plasterboard",
                                    "color": "#06b6d4",
                                    "desc": "Moisture-resistant (MR) plasterboard required in wet areas. Fire-rated board required on FRL walls. Standard board for dry areas only.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "F3",
                    "title": "Part F3",
                    "subtitle": "Roof and wall cladding",
                    "color": "#1D9E75",
                    "bss": True,
                    "children": [
                        {
                            "id": "F3-O",
                            "title": "F3O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F3-P",
                            "title": "F3P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F3-D",
                            "title": "F3D1",
                            "subtitle": "DTS → AS 1288, AS 2047",
                            "color": "#1D9E75",
                            "standard": "AS 1288, AS 2047",
                            "children": [
                                {
                                    "id": "F3-AS1",
                                    "title": "AS 1288:2021",
                                    "subtitle": "Glass in buildings",
                                    "color": "#06b6d4",
                                    "desc": "Safety glass required in shower screens, near doors, and low-level glazing below 300mm from floor. Minimum 6mm toughened safety glass for shower screens. Laminated glass for overhead glazing.",
                                },
                                {
                                    "id": "F3-AS2",
                                    "title": "AS 2047:2014",
                                    "subtitle": "Windows and external glazed doors",
                                    "color": "#06b6d4",
                                    "desc": "Windows and external glazed doors must meet structural and weather performance ratings for the wind region. Performance levels N1 to N6. Products must be tested and rated to AS 2047.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "F4",
                    "title": "Part F4",
                    "subtitle": "Sanitary and other facilities",
                    "color": "#1D9E75",
                    "children": [
                        {
                            "id": "F4-O",
                            "title": "F4O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F4-P",
                            "title": "F4P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F4-D",
                            "title": "F4D1",
                            "subtitle": "DTS solution",
                            "color": "#1D9E75",
                            "desc": "Specifies minimum number of toilets, basins, and showers based on building class and occupancy numbers.",
                        },
                    ],
                },
                {
                    "id": "F5",
                    "title": "Part F5",
                    "subtitle": "Room heights",
                    "color": "#1D9E75",
                    "bss": True,
                    "children": [
                        {
                            "id": "F5-O",
                            "title": "F5O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F5-P",
                            "title": "F5P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F5-D",
                            "title": "F5D2",
                            "subtitle": "DTS → 2.4m minimum",
                            "color": "#1D9E75",
                            "desc": "Habitable rooms must have a minimum ceiling height of 2.4m.",
                        },
                    ],
                },
                {
                    "id": "F6",
                    "title": "Part F6",
                    "subtitle": "Light and ventilation",
                    "color": "#1D9E75",
                    "bss": True,
                    "children": [
                        {
                            "id": "F6-O",
                            "title": "F6O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F6-P",
                            "title": "F6P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F6-D",
                            "title": "F6D2",
                            "subtitle": "DTS → window area ratios",
                            "color": "#1D9E75",
                            "desc": "Natural light: window area at least 10% of floor area. Ventilation: openable area at least 5%.",
                        },
                    ],
                },
                {
                    "id": "F7",
                    "title": "Part F7",
                    "subtitle": "Sound transmission and insulation",
                    "color": "#1D9E75",
                    "children": [
                        {
                            "id": "F7-O",
                            "title": "F7O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F7-P",
                            "title": "F7P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                            "desc": "Walls and floors between sole-occupancy units must achieve minimum Rw+Ctr of 50 for airborne sound.",
                        },
                        {
                            "id": "F7-D",
                            "title": "F7D1",
                            "subtitle": "DTS → AS 1276.1",
                            "color": "#1D9E75",
                            "standard": "AS 1276.1",
                            "children": [
                                {
                                    "id": "F7-AS",
                                    "title": "AS 1276.1",
                                    "subtitle": "Rating of sound insulation",
                                    "color": "#06b6d4",
                                    "desc": "Method for rating airborne sound insulation of walls and floors. Rw is the weighted sound reduction index. Higher Rw = better sound insulation. Class 2 buildings: minimum Rw+Ctr 50 between apartments.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "F8",
                    "title": "Part F8",
                    "subtitle": "Condensation management",
                    "color": "#1D9E75",
                    "children": [
                        {
                            "id": "F8-O",
                            "title": "F8O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F8-P",
                            "title": "F8P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "F8-D",
                            "title": "F8D1",
                            "subtitle": "DTS solution",
                            "color": "#1D9E75",
                            "desc": "Requires vapour barriers, ventilated roof spaces, and exhaust fans ducted to outside in climate zones prone to condensation.",
                        },
                    ],
                },
                {
                    "id": "F-S26",
                    "title": "Specification 26",
                    "subtitle": "Waterproofing requirements for wet areas",
                    "color": "#1D9E75",
                    "desc": "Detailed table of waterproofing zones, materials, and minimum membrane heights for all wet area locations including showers, bathrooms, laundries, and balconies.",
                },
                {
                    "id": "F-S27",
                    "title": "Specification 27",
                    "subtitle": "Accessible adult change facilities",
                    "color": "#1D9E75",
                    "desc": "Layout and fitout requirements for accessible adult change facilities in Class 9 buildings. Covers floor area, hoist provisions, bed dimensions and privacy screens.",
                },
                {
                    "id": "F-S28",
                    "title": "Specification 28",
                    "subtitle": "Sound insulation for building elements",
                    "color": "#1D9E75",
                    "desc": "Prescribes minimum Rw+Ctr ratings for walls and floors between sole-occupancy units and adjoining spaces. Key reference for wall and floor system product selection in Class 2 and 3 buildings.",
                },
                {
                    "id": "F-S29",
                    "title": "Specification 29",
                    "subtitle": "Impact sound — test of equivalence",
                    "color": "#1D9E75",
                    "desc": "Defines test methodology for demonstrating equivalence of impact sound performance in floor assemblies. Relevant to flooring product selection between apartments.",
                },
            ],
        },
        {
            "id": "G",
            "title": "Section G",
            "subtitle": "Ancillary provisions",
            "color": "#888780",
            "children": [
                {
                    "id": "G1",
                    "title": "Part G1",
                    "subtitle": "Minor structures",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G1-O",
                            "title": "G1O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G1-D",
                            "title": "G1D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "G2",
                    "title": "Part G2",
                    "subtitle": "Boilers, pressure vessels, heating appliances, fireplaces, chimneys and flues",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G2-O",
                            "title": "G2O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G2-P",
                            "title": "G2P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G2-D",
                            "title": "G2D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                            "desc": "Governs safe installation of boilers, pressure vessels, fireplaces and flues. Relevant to heating product selection and installation clearances.",
                        },
                    ],
                },
                {
                    "id": "G3",
                    "title": "Part G3",
                    "subtitle": "Atrium construction",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G3-O",
                            "title": "G3O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G3-P",
                            "title": "G3P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G3-D",
                            "title": "G3D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                            "desc": "Sets out construction and fire safety requirements for buildings with atriums. Covers glazing, balustrades and smoke control relevant to product selection.",
                        },
                    ],
                },
                {
                    "id": "G4",
                    "title": "Part G4",
                    "subtitle": "Construction in alpine areas",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G4-O",
                            "title": "G4O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G4-P",
                            "title": "G4P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G4-D",
                            "title": "G4D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                            "desc": "Additional requirements for buildings in alpine environments covering snow loads, insulation, and weatherproofing beyond standard requirements.",
                        },
                    ],
                },
                {
                    "id": "G5",
                    "title": "Part G5",
                    "subtitle": "Construction in bushfire prone areas",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G5-O",
                            "title": "G5O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G5-P",
                            "title": "G5P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G5-D",
                            "title": "G5D1",
                            "subtitle": "DTS → AS 3959",
                            "color": "#888780",
                            "standard": "AS 3959",
                            "desc": "Buildings in bushfire prone areas must comply with AS 3959. BAL (Bushfire Attack Level) rating determines cladding, glazing, and sealing requirements.",
                        },
                    ],
                },
                {
                    "id": "G6",
                    "title": "Part G6",
                    "subtitle": "Occupiable outdoor areas",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G6-O",
                            "title": "G6O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G6-P",
                            "title": "G6P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G6-D",
                            "title": "G6D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                            "desc": "Requirements for rooftop and podium outdoor areas used by occupants. Covers balustrades, waterproofing, drainage and surface finishes.",
                        },
                    ],
                },
                {
                    "id": "G7",
                    "title": "Part G7",
                    "subtitle": "Livable housing design",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "G7-O",
                            "title": "G7O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "G7-P",
                            "title": "G7P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "G7-D",
                            "title": "G7D1",
                            "subtitle": "DTS → livable housing",
                            "color": "#888780",
                            "desc": "Accessible entry, step-free shower, wider doorways (820mm min clear) for livable housing design. Applies to new Class 2 and Class 1 buildings from 2022.",
                        },
                    ],
                },
                {
                    "id": "G-S30",
                    "title": "Specification 30",
                    "subtitle": "Installation of boilers and pressure vessels",
                    "color": "#888780",
                    "desc": "Technical installation requirements for boilers and pressure vessels including clearances, flues and safety devices.",
                },
                {
                    "id": "G-S31",
                    "title": "Specification 31",
                    "subtitle": "Fire and smoke control in buildings with atriums",
                    "color": "#888780",
                    "desc": "Engineering requirements for fire and smoke control systems in atrium buildings. Covers mechanical exhaust, detection and sprinkler provisions.",
                },
                {
                    "id": "G-S43",
                    "title": "Specification 43",
                    "subtitle": "Bushfire protection for certain Class 9 buildings",
                    "color": "#888780",
                    "desc": "Construction requirements for Class 9 buildings in bushfire prone areas. Covers external wall cladding, glazing, vents and sealing requirements based on BAL rating.",
                },
            ],
        },
        {
            "id": "I",
            "title": "Section I",
            "subtitle": "Special use",
            "color": "#888780",
            "children": [
                {
                    "id": "I1",
                    "title": "Part I1",
                    "subtitle": "Class 9b buildings",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "I1-O",
                            "title": "I1O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "I1-P",
                            "title": "I1P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "I1-D",
                            "title": "I1D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "I2",
                    "title": "Part I2",
                    "subtitle": "Public transport buildings",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "I2-O",
                            "title": "I2O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "I2-D",
                            "title": "I2D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "I3",
                    "title": "Part I3",
                    "subtitle": "Farm buildings and farm sheds",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "I3-O",
                            "title": "I3O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "I3-D",
                            "title": "I3D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "I-S32",
                    "title": "Specification 32",
                    "subtitle": "Construction of proscenium walls",
                    "color": "#888780",
                    "desc": "Sets out construction requirements for proscenium walls in theatres and performance venues classified as Class 9b. Covers fire resistance, structural stability and opening protection.",
                },
            ],
        },
        {
            "id": "J",
            "title": "Section J",
            "subtitle": "Energy efficiency",
            "color": "#BA7517",
            "children": [
                {
                    "id": "J1",
                    "title": "Part J1",
                    "subtitle": "Energy performance",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J1-O",
                            "title": "J1O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J1-P",
                            "title": "J1P1",
                            "subtitle": "Performance requirement",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J1-D",
                            "title": "J1D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J2",
                    "title": "Part J2",
                    "subtitle": "Energy efficiency",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J2-O",
                            "title": "J2O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J2-D",
                            "title": "J2D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J3",
                    "title": "Part J3",
                    "subtitle": "Elemental provisions for Class 2 sole-occupancy units",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J3-O",
                            "title": "J3O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J3-P",
                            "title": "J3P1",
                            "subtitle": "Performance requirement",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J3-D",
                            "title": "J3D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                            "desc": "Prescribes energy efficiency requirements for individual apartments in Class 2 buildings and Class 4 parts. Covers ceiling, wall and floor insulation, glazing and sealing.",
                        },
                    ],
                },
                {
                    "id": "J4",
                    "title": "Part J4",
                    "subtitle": "Building fabric",
                    "color": "#BA7517",
                    "bss": True,
                    "children": [
                        {
                            "id": "J4-O",
                            "title": "J4O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J4-P",
                            "title": "J4P1",
                            "subtitle": "Performance requirement",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J4-D",
                            "title": "J4D2",
                            "subtitle": "DTS → AS 4859.1",
                            "color": "#BA7517",
                            "standard": "AS 4859.1",
                            "desc": "Minimum R-values for walls, roofs, and floors based on climate zone.",
                            "children": [
                                {
                                    "id": "J4-AS",
                                    "title": "AS 4859.1:2018",
                                    "subtitle": "Thermal insulation materials",
                                    "color": "#06b6d4",
                                    "desc": "R-value measures resistance to heat flow. Brisbane (Zone 2): R2.5 ceiling, R1.5 wall minimum for Class 1. Higher values required for commercial. Common products: glass wool batts, polyester batts, rigid foam boards.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "J5",
                    "title": "Part J5",
                    "subtitle": "Building sealing",
                    "color": "#BA7517",
                    "bss": True,
                    "children": [
                        {
                            "id": "J5-O",
                            "title": "J5O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J5-P",
                            "title": "J5P1",
                            "subtitle": "Performance requirement",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J5-D",
                            "title": "J5D2",
                            "subtitle": "DTS → sealing specs",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J6",
                    "title": "Part J6",
                    "subtitle": "Air-conditioning and ventilation",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J6-O",
                            "title": "J6O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J6-D",
                            "title": "J6D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J7",
                    "title": "Part J7",
                    "subtitle": "Artificial lighting and power",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J7-O",
                            "title": "J7O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J7-D",
                            "title": "J7D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J8",
                    "title": "Part J8",
                    "subtitle": "Heated water supply",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J8-O",
                            "title": "J8O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J8-D",
                            "title": "J8D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J9",
                    "title": "Part J9",
                    "subtitle": "Energy monitoring",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "J9-O",
                            "title": "J9O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "J9-D",
                            "title": "J9D1",
                            "subtitle": "DTS solution",
                            "color": "#BA7517",
                        },
                    ],
                },
                {
                    "id": "J-S33",
                    "title": "Specification 33",
                    "subtitle": "Additional requirements",
                    "color": "#BA7517",
                    "desc": "Supplementary energy efficiency requirements applying to specific building types and climate zones beyond the standard J-section provisions.",
                },
                {
                    "id": "J-S34",
                    "title": "Specification 34",
                    "subtitle": "Modelling parameters for J1V3",
                    "color": "#BA7517",
                    "desc": "Input parameters and assumptions for whole-building energy modelling under the J1V3 verification pathway. Used by energy assessors for commercial buildings.",
                },
                {
                    "id": "J-S35",
                    "title": "Specification 35",
                    "subtitle": "Modelling profiles for J1V3",
                    "color": "#BA7517",
                    "desc": "Operational profiles used in energy modelling including occupancy schedules, lighting density and equipment loads for different building uses.",
                },
                {
                    "id": "J-S36",
                    "title": "Specification 36",
                    "subtitle": "Material properties",
                    "color": "#BA7517",
                    "desc": "Thermal properties of common building materials including R-values, U-values and solar absorptance. Key reference for insulation and glazing product selection.",
                },
                {
                    "id": "J-S37",
                    "title": "Specification 37",
                    "subtitle": "Calculation of U-Value and solar admittance",
                    "color": "#BA7517",
                    "desc": "Methodology for calculating U-Value and solar admittance of glazing and window systems. Relevant to window and glazing product selection for energy compliance.",
                },
                {
                    "id": "J-S38",
                    "title": "Specification 38",
                    "subtitle": "Spandrel panel thermal performance",
                    "color": "#BA7517",
                    "desc": "Calculation method for determining thermal performance of spandrel panels in commercial facade systems.",
                },
                {
                    "id": "J-S39",
                    "title": "Specification 39",
                    "subtitle": "Sub-floor and soil thermal performance",
                    "color": "#BA7517",
                    "desc": "Method for calculating thermal resistance of sub-floor spaces and soil conditions for ground floor energy modelling.",
                },
                {
                    "id": "J-S40",
                    "title": "Specification 40",
                    "subtitle": "Lighting and power control devices",
                    "color": "#BA7517",
                    "desc": "Requirements for lighting control systems including occupancy sensors, daylight dimming and time switches. Relevant to lighting product selection for commercial fitouts.",
                },
                {
                    "id": "J-S44",
                    "title": "Specification 44",
                    "subtitle": "Calculation of heating, cooling and thermal energy load limits",
                    "color": "#BA7517",
                    "desc": "Defines the calculation methodology for determining heating load limits, cooling load limits and thermal energy load limits for Class 2 sole-occupancy units.",
                },
                {
                    "id": "J-S45",
                    "title": "Specification 45",
                    "subtitle": "Modelling profiles for J1V5",
                    "color": "#BA7517",
                    "desc": "Operational profiles for the J1V5 whole-of-home energy verification method for Class 2 apartments. Covers occupancy, lighting and appliance schedules.",
                },
            ],
        },
    ],
}

VOLUME_TWO = {
    "id": "root2",
    "title": "NCC Volume Two",
    "subtitle": "Class 1 and Class 10 buildings",
    "color": "#06b6d4",
    "is_root": True,
    "children": [
        {
            "id": "V2-A",
            "title": "Section A",
            "subtitle": "Governing requirements",
            "color": "#6366F1",
            "children": [
                {
                    "id": "V2-A1",
                    "title": "Part A1",
                    "subtitle": "Interpreting the NCC",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "V2-A1-O",
                            "title": "A1O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A1-P",
                            "title": "A1P1",
                            "subtitle": "Performance requirement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A1-D",
                            "title": "A1D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                        },
                    ],
                },
                {
                    "id": "V2-A2",
                    "title": "Part A2",
                    "subtitle": "Compliance with the NCC",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "V2-A2-O",
                            "title": "A2O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A2-P",
                            "title": "A2P1",
                            "subtitle": "Performance requirement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A2-D",
                            "title": "A2D1",
                            "subtitle": "DTS solution",
                            "color": "#6366F1",
                        },
                    ],
                },
                {
                    "id": "V2-A6",
                    "title": "Part A6",
                    "subtitle": "Building classification",
                    "color": "#6366F1",
                    "children": [
                        {
                            "id": "V2-A6-O",
                            "title": "A6O1",
                            "subtitle": "Objective",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A6-F",
                            "title": "A6F1",
                            "subtitle": "Functional statement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A6-P",
                            "title": "A6P1",
                            "subtitle": "Performance requirement",
                            "color": "#6366F1",
                        },
                        {
                            "id": "V2-A6-D",
                            "title": "A6D1",
                            "subtitle": "DTS → Class 1 and 10",
                            "color": "#6366F1",
                        },
                    ],
                },
            ],
        },
        {
            "id": "V2-H",
            "title": "Section H",
            "subtitle": "Class 1 and 10 buildings",
            "color": "#06b6d4",
            "children": [
                {
                    "id": "V2-H1",
                    "title": "Part H1",
                    "subtitle": "Structure",
                    "color": "#06b6d4",
                    "children": [
                        {
                            "id": "V2-H1-O",
                            "title": "H1O1",
                            "subtitle": "Objective",
                            "color": "#06b6d4",
                        },
                        {
                            "id": "V2-H1-P",
                            "title": "H1P1",
                            "subtitle": "Performance requirement",
                            "color": "#06b6d4",
                        },
                        {
                            "id": "V2-H1-D",
                            "title": "H1D1",
                            "subtitle": "DTS solution",
                            "color": "#06b6d4",
                        },
                    ],
                },
                {
                    "id": "V2-H2",
                    "title": "Part H2",
                    "subtitle": "Damp and weatherproofing",
                    "color": "#06b6d4",
                    "children": [
                        {
                            "id": "V2-H2-O",
                            "title": "H2O1",
                            "subtitle": "Objective",
                            "color": "#06b6d4",
                        },
                        {
                            "id": "V2-H2-P",
                            "title": "H2P1",
                            "subtitle": "Performance requirement",
                            "color": "#06b6d4",
                        },
                        {
                            "id": "V2-H2-D",
                            "title": "H2D1",
                            "subtitle": "DTS → AS 4654.2",
                            "color": "#06b6d4",
                            "standard": "AS 4654.2",
                            "children": [
                                {
                                    "id": "V2-H2-AS",
                                    "title": "AS 4654.2",
                                    "subtitle": "External waterproofing membranes",
                                    "color": "#1D9E75",
                                    "desc": "Waterproofing membranes for external above-ground surfaces — balconies, podiums. Membrane must extend minimum 100mm up vertical faces.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "V2-H3",
                    "title": "Part H3",
                    "subtitle": "Fire safety",
                    "color": "#E24B4A",
                    "children": [
                        {
                            "id": "V2-H3-O",
                            "title": "H3O1",
                            "subtitle": "Objective",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "V2-H3-P",
                            "title": "H3P1",
                            "subtitle": "Performance requirement",
                            "color": "#E24B4A",
                        },
                        {
                            "id": "V2-H3-D",
                            "title": "H3D1",
                            "subtitle": "DTS solution",
                            "color": "#E24B4A",
                        },
                    ],
                },
                {
                    "id": "V2-H4",
                    "title": "Part H4",
                    "subtitle": "Health and amenity",
                    "color": "#1D9E75",
                    "children": [
                        {
                            "id": "V2-H4-O",
                            "title": "H4O1",
                            "subtitle": "Objective",
                            "color": "#1D9E75",
                        },
                        {
                            "id": "V2-H4-P",
                            "title": "H4P1",
                            "subtitle": "Performance requirement",
                            "color": "#1D9E75",
                            "desc": "Wet areas must be waterproofed to prevent water damage and health risks.",
                        },
                        {
                            "id": "V2-H4-D2",
                            "title": "H4D2",
                            "subtitle": "DTS → wet area locations",
                            "color": "#1D9E75",
                            "desc": "Specifies where waterproofing is required — shower recess, bathroom floor, laundry.",
                        },
                        {
                            "id": "V2-H4-D3",
                            "title": "H4D3",
                            "subtitle": "DTS → AS 3740",
                            "color": "#1D9E75",
                            "standard": "AS 3740, AS 2588",
                            "desc": "Specifies materials and installation method for waterproofing. References AS 3740.",
                            "children": [
                                {
                                    "id": "V2-H4-AS1",
                                    "title": "AS 3740",
                                    "subtitle": "Waterproofing of wet areas",
                                    "color": "#1D9E75",
                                    "desc": "Zone 1: shower walls to 1800mm. Zone 2: bathroom floor with 150mm upstand at walls.",
                                },
                                {
                                    "id": "V2-H4-AS2",
                                    "title": "AS 2588",
                                    "subtitle": "Gypsum plasterboard",
                                    "color": "#1D9E75",
                                    "desc": "Moisture-resistant plasterboard required in wet areas. Fire-rated board for FRL walls.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "V2-H5",
                    "title": "Part H5",
                    "subtitle": "Safe movement and access",
                    "color": "#378ADD",
                    "children": [
                        {
                            "id": "V2-H5-O",
                            "title": "H5O1",
                            "subtitle": "Objective",
                            "color": "#378ADD",
                        },
                        {
                            "id": "V2-H5-P",
                            "title": "H5P1",
                            "subtitle": "Performance requirement",
                            "color": "#378ADD",
                        },
                        {
                            "id": "V2-H5-D",
                            "title": "H5D1",
                            "subtitle": "DTS → stairs and balustrades",
                            "color": "#378ADD",
                            "desc": "Minimum stair dimensions, balustrade heights (1m for floors over 1m above ground), slip resistance.",
                        },
                    ],
                },
                {
                    "id": "V2-H6",
                    "title": "Part H6",
                    "subtitle": "Energy efficiency",
                    "color": "#BA7517",
                    "children": [
                        {
                            "id": "V2-H6-O",
                            "title": "H6O1",
                            "subtitle": "Objective",
                            "color": "#BA7517",
                        },
                        {
                            "id": "V2-H6-P",
                            "title": "H6P1",
                            "subtitle": "Performance requirement",
                            "color": "#BA7517",
                        },
                        {
                            "id": "V2-H6-D",
                            "title": "H6D1",
                            "subtitle": "DTS → AS 4859.1",
                            "color": "#BA7517",
                            "standard": "AS 4859.1",
                            "desc": "Minimum R-values for walls, roofs, and floors. Brisbane (Zone 2): R2.5 ceiling, R1.5 wall.",
                            "children": [
                                {
                                    "id": "V2-H6-AS",
                                    "title": "AS 4859.1",
                                    "subtitle": "Thermal insulation materials",
                                    "color": "#BA7517",
                                    "desc": "R-value measures resistance to heat flow. Higher R-value = better insulation. Brisbane Zone 2 minimum: R2.5 ceiling, R1.5 wall.",
                                },
                            ],
                        },
                    ],
                },
                {
                    "id": "V2-H7",
                    "title": "Part H7",
                    "subtitle": "Ancillary provisions",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "V2-H7-O",
                            "title": "H7O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "V2-H7-D",
                            "title": "H7D1",
                            "subtitle": "DTS solution",
                            "color": "#888780",
                        },
                    ],
                },
                {
                    "id": "V2-H8",
                    "title": "Part H8",
                    "subtitle": "Livable housing design",
                    "color": "#888780",
                    "children": [
                        {
                            "id": "V2-H8-O",
                            "title": "H8O1",
                            "subtitle": "Objective",
                            "color": "#888780",
                        },
                        {
                            "id": "V2-H8-P",
                            "title": "H8P1",
                            "subtitle": "Performance requirement",
                            "color": "#888780",
                        },
                        {
                            "id": "V2-H8-D",
                            "title": "H8D1",
                            "subtitle": "DTS → livable housing",
                            "color": "#888780",
                            "desc": "Accessible entry, step-free shower, wider doorways for livable housing design.",
                        },
                    ],
                },
            ],
        },
    ],
}


# ── Recursive DB writer ───────────────────────────────────────────────────────


def create_node(data, volume, parent=None, order=0):
    node = NCCNode.objects.create(
        node_id=data["id"],
        title=data["title"],
        subtitle=data.get("subtitle", ""),
        color=data.get("color", "#6366F1"),
        volume=volume,
        parent=parent,
        order=order,
        desc=data.get("desc", ""),
        standard=data.get("standard", ""),
        bss=data.get("bss", False),
        is_root=data.get("is_root", False),
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
            help="Skip seeding if nodes already exist in the database (safe for production deploys)",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Force re-seed even if nodes exist (WARNING: clears all existing nodes)",
        )

    def handle(self, *args, **kwargs):
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
