from django.contrib import admin
from .models import Standard, BuildingClass, RoomType, ProductCategory, ComplianceRule, NCCNode


@admin.register(Standard)
class StandardAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'priority']
    search_fields = ['code', 'title']
    list_filter = ['priority']


@admin.register(BuildingClass)
class BuildingClassAdmin(admin.ModelAdmin):
    list_display = ['code', 'name']
    search_fields = ['code', 'name']


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']


@admin.register(ComplianceRule)
class ComplianceRuleAdmin(admin.ModelAdmin):
    list_display = ['standard', 'requirement']
    search_fields = ['requirement']
    filter_horizontal = ['building_classes', 'room_types', 'product_categories']


@admin.register(NCCNode)
class NCCNodeAdmin(admin.ModelAdmin):
    list_display  = ['node_id', 'title', 'subtitle', 'volume', 'parent', 'order', 'bss', 'is_root']
    list_filter   = ['volume', 'bss', 'is_root']
    search_fields = ['node_id', 'title', 'subtitle', 'desc', 'standard']
    ordering      = ['volume', 'order']
    list_editable = ['order']
    autocomplete_fields = ['parent']

    fieldsets = (
        ('Identity', {
            'fields': ('node_id', 'title', 'subtitle', 'color')
        }),
        ('Tree structure', {
            'fields': ('volume', 'parent', 'order', 'is_root')
        }),
        ('Content', {
            'fields': ('desc', 'example', 'photo_url', 'why')
        }),
        ('Metadata', {
            'fields': ('standard', 'bss')
        }),
    )