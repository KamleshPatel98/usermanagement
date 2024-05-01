@if (session()->has('success'))
    <script>
        alertify.set('notifier','position', 'top-right');
        alertify.success('{{ session('success') }}');
    </script>
@endif
@if (session()->has('error'))
    <script>
        alertify.set('notifier','position', 'top-right');
        alertify.error('{{ session('error') }}');
    </script>
@endif
@if($errors->any())
    @foreach ($errors->all() as $row)
        <div class="alert alert-danger" role="alert">
            {{ $row }}
        </div>
        @break;
    @endforeach
@endif