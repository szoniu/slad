

// Baza danych - filtrowanie

    function filterTable() {
        let scope = document.getElementById('filter-scope').value.toLowerCase();
        let level1 = document.getElementById('filter-level1').value.toLowerCase();
        let level2 = document.getElementById('filter-level2').value.toLowerCase();
        let level3 = document.getElementById('filter-level3').value.toLowerCase();
        let level4 = document.getElementById('filter-level4').value.toLowerCase();
        let columnText = document.getElementById('filter-column-text').value.toLowerCase();
        let uom = document.getElementById('filter-uom').value.toLowerCase();
        let ghgUnit = document.getElementById('filter-ghg-unit').value.toLowerCase();

        document.querySelectorAll('#kt_ecommerce_report_sales_table tbody tr').forEach(function(row) {
            let showRow = true;

            if (scope && row.querySelector('.scope').textContent.toLowerCase().indexOf(scope) === -1) {
                showRow = false;
            }
            if (level1 && row.querySelector('.level1').textContent.toLowerCase().indexOf(level1) === -1) {
                showRow = false;
            }
            if (level2 && row.querySelector('.level2').textContent.toLowerCase().indexOf(level2) === -1) {
                showRow = false;
            }
            if (level3 && row.querySelector('.level3').textContent.toLowerCase().indexOf(level3) === -1) {
                showRow = false;
            }
            if (level4 && row.querySelector('.level4').textContent.toLowerCase().indexOf(level4) === -1) {
                showRow = false;
            }
            if (columnText && row.querySelector('.column-text').textContent.toLowerCase().indexOf(columnText) === -1) {
                showRow = false;
            }
            if (uom && row.querySelector('.uom').textContent.toLowerCase().indexOf(uom) === -1) {
                showRow = false;
            }
            if (ghgUnit && row.querySelector('.ghg-unit').textContent.toLowerCase().indexOf(ghgUnit) === -1) {
                showRow = false;
            }

            row.style.display = showRow ? '' : 'none';
        });
    }

    document.querySelectorAll('select').forEach(function(select) {
        select.addEventListener('change', filterTable);
    });

