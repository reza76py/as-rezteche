from django.contrib import admin
from .models import Standard, ProductCategory, RoomType, BuildingClass, ComplianceRule


class ComplianceRuleInline(admin.TabularInline):
    model = ComplianceRule
    extra = 1
    filter_horizontal = ('building_classes', 'room_types', 'product_categories')


@admin.register(Standard)
class StandardAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'priority')
    list_filter = ('priority',)
    search_fields = ('code', 'title')
    inlines = [ComplianceRuleInline]


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BuildingClass)
class BuildingClassAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')
    search_fields = ('code', 'name')


@admin.register(ComplianceRule)
class ComplianceRuleAdmin(admin.ModelAdmin):
    list_display = ('standard', 'requirement_preview')
    list_filter = ('standard', 'building_classes', 'room_types', 'product_categories')
    search_fields = ('requirement', 'standard__code')
    filter_horizontal = ('building_classes', 'room_types', 'product_categories')

    def requirement_preview(self, obj):
        return obj.requirement[:80]
    requirement_preview.short_description = 'Requirement'
