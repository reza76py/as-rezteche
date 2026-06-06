from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Standard, ProductCategory, RoomType, BuildingClass, ComplianceRule
from .serializers import (
    StandardSerializer, ProductCategorySerializer,
    RoomTypeSerializer, BuildingClassSerializer, ComplianceRuleSerializer
)


class StandardListView(generics.ListAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer


class StandardDetailView(generics.RetrieveAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    lookup_field = 'code'


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


class RoomTypeListView(generics.ListAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer


class BuildingClassListView(generics.ListAPIView):
    queryset = BuildingClass.objects.all()
    serializer_class = BuildingClassSerializer


@api_view(['POST'])
def check_compliance(request):
    building_class_id = request.data.get('building_class')
    room_type_id = request.data.get('room_type')
    product_category_id = request.data.get('product_category')

    rules = ComplianceRule.objects.all()

    if building_class_id:
        rules = rules.filter(building_classes__id=building_class_id)
    if room_type_id:
        rules = rules.filter(room_types__id=room_type_id)
    if product_category_id:
        rules = rules.filter(product_categories__id=product_category_id)

    rules = rules.distinct()
    serializer = ComplianceRuleSerializer(rules, many=True)

    return Response({
        'count': rules.count(),
        'results': serializer.data
    })
