from rest_framework.permissions import BasePermission


class IsComingFromServer(BasePermission):

    message = "You do not have permission to view this object"

    def has_permission(self, request, view):

        if 'Origin' in request.headers:
            if request.headers['Origin'] == 'http://ferriestocorfu.s3-website.eu-central-1.amazonaws.com':
                return True
        return False
