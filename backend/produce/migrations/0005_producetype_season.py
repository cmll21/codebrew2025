# Generated by Django 5.2 on 2025-04-25 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produce', '0004_producecategory_producetype_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='producetype',
            name='season',
            field=models.CharField(blank=True, choices=[('spring', 'Spring'), ('summer', 'Summer'), ('autumn', 'Autumn'), ('winter', 'Winter')], max_length=50, null=True),
        ),
    ]
