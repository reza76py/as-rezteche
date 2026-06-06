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
