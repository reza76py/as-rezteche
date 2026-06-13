from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Standard, BuildingClass, RoomType, ProductCategory, ComplianceRule, NCCNode
from .serializers import (
    StandardSerializer, BuildingClassSerializer,
    RoomTypeSerializer, ProductCategorySerializer, NCCNodeSerializer
)


class StandardListView(generics.ListAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer


class StandardDetailView(generics.RetrieveAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    lookup_field = 'code'


class BuildingClassListView(generics.ListAPIView):
    queryset = BuildingClass.objects.all()
    serializer_class = BuildingClassSerializer


class RoomTypeListView(generics.ListAPIView):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


@api_view(['POST'])
def check_compliance(request):
    building_class_code = request.data.get('building_class')
    room_type_slug = request.data.get('room_type')
    product_category_slug = request.data.get('product_category')

    rules = ComplianceRule.objects.all()

    if building_class_code:
        rules = rules.filter(building_classes__code=building_class_code)
    if room_type_slug:
        rules = rules.filter(room_types__slug=room_type_slug)
    if product_category_slug:
        rules = rules.filter(product_categories__slug=product_category_slug)

    rules = rules.distinct()

    results = []
    for rule in rules:
        results.append({
            'standard_code': rule.standard.code,
            'standard_title': rule.standard.title,
            'requirement': rule.requirement,
            'key_numbers': rule.key_numbers,
            'reason': rule.reason,
        })

    return Response(results)


@api_view(['GET'])
def ncc_tree(request):
    volume = request.query_params.get('volume', '1')
    try:
        volume_int = int(volume)
    except ValueError:
        return Response({'error': 'volume must be 1 or 2'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        root = NCCNode.objects.get(volume=volume_int, is_root=True)
    except NCCNode.DoesNotExist:
        return Response({'error': f'No root node found for volume {volume_int}'},
                        status=status.HTTP_404_NOT_FOUND)

    serializer = NCCNodeSerializer(root)
    return Response(serializer.data)
