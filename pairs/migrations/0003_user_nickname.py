# Generated by Django 3.1.3 on 2021-04-24 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pairs', '0002_score_result'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
    ]
