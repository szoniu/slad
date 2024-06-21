$(document).ready(function() {
    var table = $('#kt_ecommerce_report_sales_table').DataTable();

    // Dodaj filtry kolumn bez ponownej inicjalizacji tabeli
    table.columns().every(function() {
        var column = this;

        // Dodaj selecty do filtrowania z użyciem Select2
        var select = $('select', column.header()).select2({
            placeholder: "Select a value",
            allowClear: true,
            width: 'resolve',
            dropdownAutoWidth: true
        });

        column.data().unique().sort().each(function(d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
        });

        select.on('change', function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            column.search(val ? '^' + val + '$' : '', true, false).draw();
        });

        // Zatrzymaj propagację zdarzenia kliknięcia dla select2, aby uniknąć sortowania kolumn
        select.on('mousedown', function(e) {
            e.stopPropagation();
        });

        // Umożliw kliknięcie w kolumnę, aby posortować dane
        $(column.header()).on('click', function(e) {
            if (!$(e.target).is('select, .select2-selection, .select2-selection__rendered')) {
                column.order('asc').draw();
            }
        });
    });

    // Dodaj inputy do filtrowania tekstu (jeśli są potrzebne)
    $('input', table.header()).on('keyup change clear', function() {
        var column = table.column($(this).parent().index() + ':visible');
        if (column.search() !== this.value) {
            column.search(this.value).draw();
        }
    });
});
