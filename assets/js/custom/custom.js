$(document).ready(function() {
    var table = $('#kt_ecommerce_report_sales_table').DataTable();

    // Dodaj filtry kolumn bez ponownej inicjalizacji tabeli
    table.columns().every(function(index) {
        var column = this;

        // Dodaj selecty do filtrowania z użyciem Select2
        var select = $('select', column.header()).select2({
            placeholder: "Select a value",
            allowClear: true,
            width: 'resolve',
            dropdownAutoWidth: true
        });

        column.data().unique().sort().each(function(d, j) {
            select.append('<option value="' + d + '">' + d + '</option>');
        });

        select.on('change', function() {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            column.search(val ? '^' + val + '$' : '', true, false).draw();
        });

        // Zatrzymaj propagację zdarzenia kliknięcia dla select2, aby uniknąć sortowania kolumn
        select.on('click', function(e) {
            e.stopPropagation();
        });

        // Umożliw kliknięcie w kolumnę, aby posortować dane, z wyjątkiem elementu Select2
        $(column.header()).off('click').on('click', function(e) {
            if (!$(e.target).closest('.select2').length) {
                column.order(column.order()[0][1] === 'asc' ? 'desc' : 'asc').draw();
            }
        });
    });
});
