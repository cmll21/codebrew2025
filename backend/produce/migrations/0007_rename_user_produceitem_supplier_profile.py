# Generated by Django 5.2 on 2025-04-25 18:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('produce', '0006_remove_produceitem_supplier_profile_produceitem_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='produceitem',
            old_name='user',
            new_name='supplier_profile',
        ),
    ]
