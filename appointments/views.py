import datetime

import django_filters
from django.core.exceptions import BadRequest
from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from guide.models import Timings, Package
from guide.serializers import TimingsSerializer
from .models import Appointment
from .serializers import AppointmentCreateSerializer, AppointmentsSerializer, AppointmentDetailSerializer, \
    BookingsListSerializer


class BookAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentCreateSerializer
    queryset = Appointment
    permission_classes = [IsAuthenticated]


class GuideAvailabilityView(generics.ListAPIView):
    serializer_class = TimingsSerializer

    def get_queryset(self):
        date = self.request.query_params.get('date')
        guide_id = self.kwargs.get('guide_id')
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()

        curr_date = datetime.date.today()

        if curr_date > date:
            raise BadRequest('previous date')

        # uss date pr wo timings nikaalo jaha p koi bhi appointment na ho
        day_name = date.strftime("%A")

        package_obj = get_object_or_404(Package, guide_id=guide_id)

        if not package_obj.availability.filter(day=day_name).exists():
            return Timings.objects.none()

        return Timings.objects.filter(~models.Q(id__in=models.Subquery(
            Appointment.objects.filter(date=date, guide_id=guide_id).values('timing_id'))) & models.Q(
            package=package_obj))


class GetAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['date']

    def get_queryset(self):
        return Appointment.objects.all().filter(guide__user__user=self.request.user).distinct('timing')


# http://localhost:8000/booking/get-appointments?date=2021-12-10


class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = AppointmentDetailSerializer
    queryset = Appointment


class ListBookingsView(generics.ListAPIView):
    serializer_class = BookingsListSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['timing', 'date']

    def get_queryset(self):
        return Appointment.objects.filter(guide__user__user=self.request.user)
