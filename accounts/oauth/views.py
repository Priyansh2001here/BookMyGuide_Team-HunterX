from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.jwt import MyTokenObtainPairView, MyTokenObtainPairSerializer
from accounts.oauth import utils
from guide.models import Partner, TourGuide


@api_view(['POST'])
def index(request):
    token = request.data.get('token')
    if not token:
        return Response({
            'token': 'Required Token Value'
        }, status=status.HTTP_406_NOT_ACCEPTABLE, )
    user_data = utils.verifyOAuthToken(token)
    if user_data is None:
        return Response({
            'token': 'Invalid or Expired Token'
        }, status=status.HTTP_401_UNAUTHORIZED)
    obj = utils.login(user_data)

    refresh = TokenObtainPairSerializer.get_token(obj)

    refresh['full_name'] = obj.full_name
    refresh['image'] = user_data.get('prof_img')
    refresh['email'] = user_data.get("email")

    is_partner = Partner.objects.filter(Q(user_id=obj.id) & Q(is_verified=True))
    if is_partner.exists():
        refresh['is_partner'] = True
        if TourGuide.objects.filter(Q(user_id=is_partner.first().id) & Q(is_verified=True)).exists():
            refresh['is_guide'] = True

    return Response(
        {'access_token': str(refresh.access_token),
         'refresh_token': str(refresh)
         })
