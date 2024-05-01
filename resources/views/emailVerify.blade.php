<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Verify Mail</title>
        <!-- Fontfaces CSS-->
        <link href="{{ asset('assets/ss/font-face.css') }}c" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/font-awesome-4.7/css/font-awesome.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/font-awesome-5/css/fontawesome-all.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/mdi-font/css/material-design-iconic-font.min.css') }}" rel="stylesheet" media="all">

        <!-- Bootstrap CSS-->
        <link href="{{ asset('assets/vendor/bootstrap-4.1/bootstrap.min.css') }}" rel="stylesheet" media="all">

        <!-- Vendor CSS-->
        <link href="{{ asset('assets/vendor/animsition/animsition.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/wow/animate.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/css-hamburgers/hamburgers.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/slick/slick.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/select2/select2.min.css') }}" rel="stylesheet" media="all">
        <link href="{{ asset('assets/vendor/perfect-scrollbar/perfect-scrollbar.css') }}" rel="stylesheet" media="all">

        <!-- Main CSS-->
        <link href="{{ asset('assets/css/theme.css') }}" rel="stylesheet" media="all">

        {{-- alertify js --}}
        <link rel="stylesheet" href="{{ asset('assets/alertify/alertify.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/alertify/alertifyTheme.css') }}">
        <script src="{{ asset('assets/alertify/alertify.js') }}"></script>

    </head>
    <body>
        
            <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                {{-- alert message --}}
                <x-alert></x-alert>

                <form action="{{ route('otpVerify') }}" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Verify Email</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="login-form">
                            <div class="form-group">
                                <label>Otp</label>
                                <input class="au-input au-input--full" type="number" name="otp" placeholder="Otp">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Verify</button>
                    </div>
                </form>
                <div class="register-link">
                    <p>
                        Already have account?
                        <a href="#">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/vendor/jquery-3.2.1.min.js') }}"></script>

    <!-- Bootstrap JS-->
    <script src="{{ asset('assets/vendor/bootstrap-4.1/popper.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/bootstrap-4.1/bootstrap.min.js') }}"></script>
    <!-- Vendor JS       -->
    <script src="{{ asset('assets/vendor/slick/slick.min.js') }}">
    </script>
    <script src="{{ asset('assets/vendor/wow/wow.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/animsition/animsition.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js') }}">
    </script>
    <script src="{{ asset('assets/vendor/counter-up/jquery.waypoints.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/counter-up/jquery.counterup.min.js') }}">
    </script>
    <script src="{{ asset('assets/vendor/circle-progress/circle-progress.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('assets/vendor/chartjs/Chart.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/select2/select2.min.js') }}">
    </script>

    <!-- Main JS-->
    <script src="{{ asset('assets/js/main.js') }}"></script>

        <script>
            $(document).ready(function () {
                setTimeout(() => {
                    $('#exampleModal').modal('show');
                }, 1000);
            });
        </script>
    </body>
</html>