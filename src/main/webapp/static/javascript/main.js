document.addEventListener('DOMContentLoaded', function () {
    var filterForm = document.getElementById('filterForm');
    var supplierDropdown = document.getElementById('supplier');

    supplierDropdown.addEventListener('change', function () {
        filterForm.submit();
    });
});