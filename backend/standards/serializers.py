from rest_framework import serializers
from .models import Standard, ProductCategory, RoomType, BuildingClass, ComplianceRule


class BuildingClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingClass
        fields = '__all__'


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = '__all__'


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ComplianceRuleSerializer(serializers.ModelSerializer):
    standard_code = serializers.CharField(source='standard.code', read_only=True)
    standard_title = serializers.CharField(source='standard.title', read_only=True)

    class Meta:
        model = ComplianceRule
        fields = '__all__'


class StandardSerializer(serializers.ModelSerializer):
    rules = ComplianceRuleSerializer(many=True, read_only=True)

    class Meta:
        model = Standard
        fields = '__all__'
