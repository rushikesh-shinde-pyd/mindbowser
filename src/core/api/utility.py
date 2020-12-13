def is_manager(obj):
    """
    Checker function to check if passed user object has role of 'manager'.
    """

    return True if obj.profile.is_manager else False