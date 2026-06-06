from django.core.management.base import BaseCommand
from standards.models import (
    Standard, ProductCategory, RoomType, BuildingClass, ComplianceRule
)


class Command(BaseCommand):
    help = 'Seed the database with Australian Standards data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # Building Classes
        classes = [
            ('1', 'House / Townhouse', 'A single dwelling or attached dwellings such as townhouses.'),
            ('2', 'Apartment Building', 'A building with two or more sole-occupancy units.'),
            ('3', 'Residential Other', 'A residential building other than Class 1 or 2 — e.g. hotel, hostel.'),
            ('5', 'Office', 'An office building used for professional or commercial purposes.'),
            ('6', 'Shop / Showroom', 'A building used as a shop, restaurant, or showroom.'),
            ('7', 'Carpark / Warehouse', 'A carpark or storage warehouse.'),
            ('8', 'Factory / Laboratory', 'A building used for production or research.'),
            ('9', 'Public Building', 'A building such as a school, hospital, or assembly building.'),
            ('10', 'Shed / Carport / Fence', 'A non-habitable structure such as a shed, carport, or fence.'),
        ]
        for code, name, desc in classes:
            BuildingClass.objects.get_or_create(code=code, defaults={'name': name, 'description': desc})

        # Room Types
        rooms = [
            ('Bathroom', 'bathroom'),
            ('Kitchen', 'kitchen'),
            ('Laundry', 'laundry'),
            ('Living Room', 'living-room'),
            ('Bedroom', 'bedroom'),
            ('Balcony / Deck', 'balcony-deck'),
            ('External / Outdoor', 'external-outdoor'),
            ('Commercial Fitout', 'commercial-fitout'),
            ('Corridor / Hallway', 'corridor-hallway'),
            ('Garage', 'garage'),
        ]
        for name, slug in rooms:
            RoomType.objects.get_or_create(slug=slug, defaults={'name': name})

        # Product Categories
        products = [
            ('Glass / Glazing', 'glass-glazing'),
            ('Windows', 'windows'),
            ('External Doors', 'external-doors'),
            ('Internal Doors', 'internal-doors'),
            ('Wall Linings', 'wall-linings'),
            ('Waterproofing', 'waterproofing'),
            ('Timber / Framing', 'timber-framing'),
            ('Insulation', 'insulation'),
            ('Paint / Coatings', 'paint-coatings'),
            ('Joinery / Cabinetry', 'joinery-cabinetry'),
        ]
        for name, slug in products:
            ProductCategory.objects.get_or_create(slug=slug, defaults={'name': name})

        # Standards
        standards_data = [
            {
                'code': 'AS 1288:2021',
                'title': 'Glass in Buildings — Selection and Installation',
                'summary': 'Specifies the correct type and thickness of glass for different locations in a building.',
                'full_description': 'AS 1288 provides guidance on selecting and installing glass in buildings. It covers safety glass requirements for hazardous locations such as shower screens, doors, and low-level glazing. Key requirements include toughened or laminated safety glass near doors and in shower screens, and minimum thickness requirements based on wind load and glass area.',
                'priority': 'high',
            },
            {
                'code': 'AS 2047:2014',
                'title': 'Windows and External Glazed Doors in Buildings',
                'summary': 'Sets performance requirements for windows and external glazed doors including weather and structural resistance.',
                'full_description': 'AS 2047 covers the performance requirements for windows and external glazed doors in buildings. It addresses structural performance, weather resistance, and operation. Products must be rated for the wind region of the building location. This standard links directly to NCC Part J energy efficiency requirements.',
                'priority': 'high',
            },
            {
                'code': 'AS 3740',
                'title': 'Waterproofing of Domestic Wet Areas',
                'summary': 'Specifies where and how waterproofing must be applied in domestic wet areas such as bathrooms and laundries.',
                'full_description': 'AS 3740 sets out the requirements for waterproofing membranes in domestic wet areas. It defines Zone 1 (shower recess floor and walls to 1800mm) and Zone 2 (remainder of bathroom floor and walls to 150mm). Products must be compatible with the substrate and applied by a licensed waterproofer in most states.',
                'priority': 'high',
            },
            {
                'code': 'AS 2588:2018',
                'title': 'Gypsum Plasterboard',
                'summary': 'Defines types of plasterboard — standard, moisture-resistant, and fire-rated — and their properties.',
                'full_description': 'AS 2588 specifies the physical and mechanical properties of gypsum plasterboard products. Key types are standard plasterboard for general use, moisture-resistant (MR) board for wet areas, and fire-rated board for walls and ceilings requiring a fire resistance level. The correct type must be selected based on the room and building requirements.',
                'priority': 'high',
            },
            {
                'code': 'AS 2589:2017',
                'title': 'Gypsum Linings — Application and Finishing',
                'summary': 'Covers how plasterboard is installed and finished, including finishing levels 1 to 5.',
                'full_description': 'AS 2589 covers the application and finishing of gypsum lining systems. It defines five finishing levels: Level 1 (fire-rated only), Level 2 (tile substrate), Level 3 (light texture), Level 4 (standard paint finish), and Level 5 (high-gloss or critical lighting). Level 4 is standard for most residential and commercial applications under paint.',
                'priority': 'high',
            },
            {
                'code': 'AS 1604.1:2012',
                'title': 'Preservative Treatment for Timber',
                'summary': 'Defines Hazard Levels H1 to H5 for treated timber based on exposure environment.',
                'full_description': 'AS 1604.1 specifies the hazard level system for preservative-treated timber. H1 is for indoor use with no moisture contact. H2 is for inside protected from weather. H3 is for outdoor above ground. H4 is for in-ground contact. H5 is for in-ground with high decay risk such as near water. Using the wrong hazard level leads to premature timber failure.',
                'priority': 'medium',
            },
            {
                'code': 'AS 4654.2',
                'title': 'Waterproofing Membranes for External Above-Ground Use',
                'summary': 'Covers waterproofing design and installation for external surfaces such as balconies and podiums.',
                'full_description': 'AS 4654.2 specifies the design and installation requirements for waterproofing membranes used on external above-ground surfaces including balconies, podiums, and planter boxes. It differs from AS 3740 which applies to indoor wet areas. The standard covers membrane selection, substrate preparation, and detailing at junctions and penetrations.',
                'priority': 'medium',
            },
            {
                'code': 'AS 4859.1:2018',
                'title': 'Thermal Insulation Materials for Buildings',
                'summary': 'Covers insulation products and R-values — the measure of thermal resistance.',
                'full_description': 'AS 4859.1 specifies the general criteria and technical provisions for thermal insulation materials used in buildings. R-value measures resistance to heat flow — higher R-value means better insulation. The NCC specifies minimum R-values for walls, ceilings, and floors based on climate zone. Common products include glass wool batts, polyester batts, and rigid foam boards.',
                'priority': 'medium',
            },
            {
                'code': 'AS 2311:2017',
                'title': 'Guide to the Painting of Buildings',
                'summary': 'A guide covering surface preparation and paint system selection for buildings.',
                'full_description': 'AS 2311 is a guide (not a mandatory standard) that provides recommendations for painting buildings. It covers surface preparation, primer selection, and paint system specification for different substrates and environments. It is most relevant to painting contractors and specifiers rather than product selection consultants.',
                'priority': 'low',
            },
        ]

        for s in standards_data:
            Standard.objects.get_or_create(code=s['code'], defaults={
                'title': s['title'],
                'summary': s['summary'],
                'full_description': s['full_description'],
                'priority': s['priority'],
            })

        # Compliance Rules
        rules = [
            {
                'standard_code': 'AS 1288:2021',
                'building_classes': ['1', '2', '5', '6'],
                'room_slugs': ['bathroom', 'commercial-fitout'],
                'product_slugs': ['glass-glazing'],
                'requirement': 'Safety glass required in shower screens, near doors, and low-level glazing below 300mm from floor.',
                'key_numbers': 'Minimum 6mm toughened safety glass for shower screens. Laminated glass required for overhead glazing.',
                'reason': 'Standard glass shatters into dangerous shards. Safety glass breaks into small blunt pieces reducing injury risk.',
            },
            {
                'standard_code': 'AS 2047:2014',
                'building_classes': ['1', '2', '5', '6'],
                'room_slugs': ['external-outdoor', 'commercial-fitout'],
                'product_slugs': ['windows', 'external-doors'],
                'requirement': 'Windows and external glazed doors must meet structural and weather performance ratings for the wind region.',
                'key_numbers': 'Performance levels N1 to N6 for wind. Products must be tested and rated to AS 2047.',
                'reason': 'Ensures windows and doors can withstand local wind loads and prevent water ingress.',
            },
            {
                'standard_code': 'AS 3740',
                'building_classes': ['1', '2', '3'],
                'room_slugs': ['bathroom', 'laundry', 'kitchen'],
                'product_slugs': ['waterproofing', 'wall-linings', 'joinery-cabinetry'],
                'requirement': 'Waterproofing membrane required on shower recess floor and walls to 1800mm, and bathroom floor with 150mm upstand.',
                'key_numbers': 'Zone 1: shower walls to 1800mm. Zone 2: bathroom floor with 150mm upstand at walls.',
                'reason': 'Prevents water damage to building structure and subfloor. Required by NCC Volume 2.',
            },
            {
                'standard_code': 'AS 2588:2018',
                'building_classes': ['1', '2', '5', '6'],
                'room_slugs': ['bathroom', 'laundry', 'kitchen', 'living-room', 'bedroom'],
                'product_slugs': ['wall-linings'],
                'requirement': 'Moisture-resistant plasterboard required in wet areas. Fire-rated plasterboard required on fire-rated walls.',
                'key_numbers': 'MR board for wet areas. Fire-rated board for FRL walls. Standard board for dry areas.',
                'reason': 'Standard plasterboard deteriorates with moisture. Fire-rated board maintains fire resistance level of the wall system.',
            },
            {
                'standard_code': 'AS 1604.1:2012',
                'building_classes': ['1', '2', '10'],
                'room_slugs': ['external-outdoor', 'balcony-deck', 'garage'],
                'product_slugs': ['timber-framing'],
                'requirement': 'Timber must be treated to the correct Hazard Level for its exposure environment.',
                'key_numbers': 'H3 for outdoor above ground. H4 for in-ground contact. H5 for high decay risk environments.',
                'reason': 'Untreated timber in exposed environments will rot, causing structural failure and costly repairs.',
            },
            {
                'standard_code': 'AS 4654.2',
                'building_classes': ['1', '2', '5', '6'],
                'room_slugs': ['balcony-deck', 'external-outdoor'],
                'product_slugs': ['waterproofing'],
                'requirement': 'Waterproofing membrane required on external above-ground surfaces such as balconies before tiling.',
                'key_numbers': 'Membrane must extend minimum 100mm up vertical faces. All penetrations must be detailed.',
                'reason': 'Prevents water ingress into the building structure through external horizontal surfaces.',
            },
            {
                'standard_code': 'AS 4859.1:2018',
                'building_classes': ['1', '2', '5', '6'],
                'room_slugs': ['living-room', 'bedroom', 'commercial-fitout'],
                'product_slugs': ['insulation'],
                'requirement': 'Insulation must meet minimum R-values specified by NCC for the climate zone.',
                'key_numbers': 'Brisbane (Zone 2): R2.5 ceiling, R1.5 wall minimum for Class 1. Higher values for commercial.',
                'reason': 'Adequate insulation reduces energy consumption and maintains comfortable indoor temperatures.',
            },
        ]

        for rule_data in rules:
            standard = Standard.objects.get(code=rule_data['standard_code'])
            rule, created = ComplianceRule.objects.get_or_create(
                standard=standard,
                requirement=rule_data['requirement'],
                defaults={
                    'key_numbers': rule_data['key_numbers'],
                    'reason': rule_data['reason'],
                }
            )
            for bc in rule_data['building_classes']:
                building_class = BuildingClass.objects.get(code=bc)
                rule.building_classes.add(building_class)
            for slug in rule_data['room_slugs']:
                room = RoomType.objects.get(slug=slug)
                rule.room_types.add(room)
            for slug in rule_data['product_slugs']:
                product = ProductCategory.objects.get(slug=slug)
                rule.product_categories.add(product)

        self.stdout.write(self.style.SUCCESS('Data seeded successfully!'))
