from rest_framework import serializers
from .models import Standard, BuildingClass, RoomType, ProductCategory, ComplianceRule, NCCNode


class BuildingClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingClass
        fields = ['id', 'code', 'name', 'description']


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['id', 'name', 'slug']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'slug']


class ComplianceRuleSerializer(serializers.ModelSerializer):
    building_classes = BuildingClassSerializer(many=True)
    room_types = RoomTypeSerializer(many=True)
    product_categories = ProductCategorySerializer(many=True)

    class Meta:
        model = ComplianceRule
        fields = ['id', 'requirement', 'key_numbers', 'reason',
                  'building_classes', 'room_types', 'product_categories']


class StandardSerializer(serializers.ModelSerializer):
    rules = ComplianceRuleSerializer(many=True, read_only=True)

    class Meta:
        model = Standard
        fields = ['id', 'code', 'title', 'summary', 'full_description', 'priority', 'rules']


# ── NCC Tree serializer (recursive) ──────────────────────────────────────────

class NCCNodeSerializer(serializers.ModelSerializer):
    """
    Recursively serializes a node and all its children.
    Matches the shape the frontend expects:
    { id, title, subtitle, color, desc, standard, bss, children: [...] }
    """
    children = serializers.SerializerMethodField()

    class Meta:
        model = NCCNode
        fields = [
            'node_id',
            'title',
            'subtitle',
            'color',
            'desc',
            'standard',
            'bss',
            'children',
        ]

    def get_children(self, obj):
        kids = obj.children.all().order_by('order')
        return NCCNodeSerializer(kids, many=True).data