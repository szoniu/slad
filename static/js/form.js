
// Opcje dodatkowe:

$(document).ready(function() {
    $('#business_type').on('change', function() {
        var selectedValue = $(this).val();
        var additionalOptions = $('#additional_select');
        var additionalOptionsDiv = $('#additional_options');
        additionalOptions.empty(); // Czyszczenie poprzednich opcji

        if (selectedValue) {
            additionalOptionsDiv.removeClass('d-none'); // Pokazanie sekcji z dodatkowymi opcjami

            // W zależności od wybranego elementu, dodawanie nowych opcji
            if (selectedValue == '1') {
                additionalOptions.append('<option value="a1">1. Uprawy rolne, chów i hodowla zwierząt, łowiectwo, włączając działalność usługową</option>');
                additionalOptions.append('<option value="a2">2. Leśnictwo i pozyskiwanie drewna</option>');
                additionalOptions.append('<option value="a2">3. Rybactwo</option>');
            } else if (selectedValue == '2') {
                additionalOptions.append('<option value="b1">1. Wydobywanie węgla kamiennego i węgla brunatnego (lignitu)</option>');
                additionalOptions.append('<option value="b2">2. Górnictwo ropy naftowej i gazu ziemnego</option>');
                additionalOptions.append('<option value="b2">3. Górnictwo rud metali</option>');
                additionalOptions.append('<option value="b2">4. Pozostałe górnictwo i wydobywanie</option>');
                additionalOptions.append('<option value="b2">5. Działalność usługowa wspomagająca górnictwo i wydobywanie</option>');
            } else if (selectedValue == '3') {
                additionalOptions.append('<option value="c1">1. Produkcja artykułów spożywczych</option>');
                additionalOptions.append('<option value="c2">2. Produkcja napojów</option>');
                additionalOptions.append('<option value="c2">3. Produkcja wyrobów tytoniowych</option>');
                additionalOptions.append('<option value="c2">4. Produkcja wyrobów tekstylnych</option>');
                additionalOptions.append('<option value="c2">5. Produkcja odzieży</option>');
                additionalOptions.append('<option value="c2">6. Produkcja skór i wyrobów ze skór wyprawionych</option>');
                additionalOptions.append('<option value="c2">7. Produkcja wyrobów z drewna oraz korka, z wyłączeniem mebli; produkcja wyrobów ze słomy i materiałów używanych do wyplatania</option>');
                additionalOptions.append('<option value="c2">8. Produkcja papieru i wyrobów z papieru</option>');
                additionalOptions.append('<option value="c2">9. Poligrafia i reprodukcja zapisanych nośników informacji</option>');
                additionalOptions.append('<option value="c2">10. Wytwarzanie i przetwarzanie koksu i produktów rafinacji ropy naftowej</option>');
                additionalOptions.append('<option value="c2">11. Produkcja chemikaliów i wyrobów chemicznych</option>');
                additionalOptions.append('<option value="c2">12. Produkcja podstawowych substancji farmaceutycznych oraz leków i pozostałych wyrobów farmaceutycznych</option>');
                additionalOptions.append('<option value="c2">13. Produkcja wyrobów z gumy i tworzyw sztucznych</option>');
                additionalOptions.append('<option value="c2">14. Produkcja wyrobów z pozostałych mineralnych surowców niemetalicznych</option>');
                additionalOptions.append('<option value="c2">15. Produkcja metali</option>');
                additionalOptions.append('<option value="c2">16. Produkcja metalowych wyrobów gotowych, z wyłączeniem maszyn i urządzeń</option>');
                additionalOptions.append('<option value="c2">17. Produkcja komputerów, wyrobów elektronicznych i optycznych</option>');
                additionalOptions.append('<option value="c2">18. Produkcja urządzeń elektrycznych</option>');
                additionalOptions.append('<option value="c2">19. Produkcja maszyn i urządzeń, gdzie indziej niesklasyfikowana</option>');
                additionalOptions.append('<option value="c2">20. Produkcja pojazdów samochodowych, przyczep i naczep, z wyłączeniem motocykli</option>');
                additionalOptions.append('<option value="c2">21. Produkcja pozostałego sprzętu transportowego</option>');
                additionalOptions.append('<option value="c2">22. Produkcja mebli</option>');
                additionalOptions.append('<option value="c2">23. Pozostała produkcja wyrobów</option>');
                additionalOptions.append('<option value="c2">24. Naprawa, konserwacja i instalowanie maszyn i urządzeń</option>');
            } else if (selectedValue == '4') {
                additionalOptions.append('<option value="d1">1. Wytwarzanie i zaopatrywanie w energię elektryczną, gaz, parę wodną, gorącą wodę i powietrze do układów klimatyzacyjnych</option>');
            } else if (selectedValue == '5') {
                additionalOptions.append('<option value="e1">1. Pobór, uzdatnianie i dostarczanie wody</option>');
                additionalOptions.append('<option value="e2">2. Odprowadzanie i oczyszczanie ścieków</option>');
                additionalOptions.append('<option value="e2">3. Działalność związana ze zbieraniem, przetwarzaniem i unieszkodliwianiem odpadów; odzysk surowców</option>');
                additionalOptions.append('<option value="e2">4. Działalność związana z rekultywacją i pozostała działalność usługowa związana z gospodarką odpadami</option>');
            } else if (selectedValue == '6') {
                additionalOptions.append('<option value="f1">1. Roboty budowlane związane ze wznoszeniem budynków</option>');
                additionalOptions.append('<option value="f2">2. Roboty związane z budową obiektów inżynierii lądowej i wodnej</option>');
                additionalOptions.append('<option value="f2">3. Roboty budowlane specjalistyczne</option>');
            } else if (selectedValue == '7') {
                additionalOptions.append('<option value="g1">1. Handel hurtowy i detaliczny pojazdami samochodowymi; naprawa pojazdów samochodowych</option>');
                additionalOptions.append('<option value="g2">2. Handel hurtowy, z wyłączeniem handlu pojazdami samochodowymi</option>');
                additionalOptions.append('<option value="g2">3. Handel detaliczny, z wyłączeniem handlu detalicznego pojazdami samochodowymi</option>');
            } else if (selectedValue == '8') {
                additionalOptions.append('<option value="h1">1. Transport lądowy oraz transport rurociągowy</option>');
                additionalOptions.append('<option value="h2">2. Transport wodny</option>');
                additionalOptions.append('<option value="h2">3. Transport lotniczy</option>');
                additionalOptions.append('<option value="h2">4. Magazynowanie i działalność usługowa wspomagająca transport</option>');
                additionalOptions.append('<option value="h2">5. Działalność pocztowa i kurierska</option>');
            } else if (selectedValue == '9') {
                additionalOptions.append('<option value="i1">1. Zakwaterowanie</option>');
                additionalOptions.append('<option value="i2">2. Działalność usługowa związana z wyżywieniem</option>');
            } else if (selectedValue == '10') {
                additionalOptions.append('<option value="j1">1. Działalność wydawnicza</option>');
                additionalOptions.append('<option value="j2">2. Działalność związana z produkcją filmów, nagrań wideo, programów telewizyjnych, nagrań dźwiękowych i muzycznych</option>');
                additionalOptions.append('<option value="j2">3. Nadawanie programów ogólnodostępnych i abonamentowych</option>');
                additionalOptions.append('<option value="j2">4. Telekomunikacja</option>');
                additionalOptions.append('<option value="j2">5. Działalność związana z oprogramowaniem i doradztwem w zakresie informatyki oraz działalność powiązana</option>');
                additionalOptions.append('<option value="j2">6. Działalność usługowa w zakresie informacji</option>');
            } else if (selectedValue == '11') {
                additionalOptions.append('<option value="k1">1. Finansowa działalność usługowa, z wyłączeniem ubezpieczeń i funduszów emerytalnych</option>');
                additionalOptions.append('<option value="k2">2. Ubezpieczenia, reasekuracja oraz fundusze emerytalne, z wyłączeniem obowiązkowego ubezpieczenia społecznego</option>');
                additionalOptions.append('<option value="k2">3. Działalność wspomagająca usługi finansowe oraz ubezpieczenia i fundusze emerytalne</option>');
            } else if (selectedValue == '12') {
                additionalOptions.append('<option value="l1">1. Działalność związana z obsługą rynku nieruchomości</option>');
            } else if (selectedValue == '13') {
                additionalOptions.append('<option value="m1">1. Działalność prawnicza, rachunkowo - księgowa i doradztwo podatkowe</option>');
                additionalOptions.append('<option value="m2">2. Działalność firm centralnych</option>');
                additionalOptions.append('<option value="m2">3. Działalność w zakresie architektury i inżynierii; badania i analizy techniczne</option>');
                additionalOptions.append('<option value="m2">4. Badania naukowe i prace rozwojowe</option>');
                additionalOptions.append('<option value="m2">5. Reklama, badanie rynku i opinii publicznej</option>');
                additionalOptions.append('<option value="m2">6. Pozostała działalność profesjonalna, naukowa i techniczna</option>');
                additionalOptions.append('<option value="m2">7. Działalność weterynaryjna</option>');
            } else if (selectedValue == '14') {
                additionalOptions.append('<option value="n1">1. Wynajem i dzierżawa</option>');
                additionalOptions.append('<option value="n2">2. Działalność związana z zatrudnieniem</option>');
                additionalOptions.append('<option value="n2">3. Działalność organizatorów turystyki, pośredników i agentów turystycznych oraz pozostała działalność usługowa w zakresie rezerwacji i działalności z nią związane</option>');
                additionalOptions.append('<option value="n2">4. Działalność detektywistyczna i ochroniarska</option>');
                additionalOptions.append('<option value="n2">5. Działalność usługowa związana z utrzymaniem porządku w budynkach i zagospodarowaniem terenów zieleni</option>');
                additionalOptions.append('<option value="n2">6. Działalność związana z administracyjną obsługą biura i pozostała działalność wspomagająca prowadzenie działalności gospodarczej</option>');
            } else if (selectedValue == '15') {
                additionalOptions.append('<option value="o1">1. Administracja publiczna oraz polityka gospodarcza i społeczna</option>');
            } else if (selectedValue == '16') {
                additionalOptions.append('<option value="p1">1. Edukacja</option>');
            } else if (selectedValue == '17') {
                additionalOptions.append('<option value="q1">1. Opieka zdrowotna</option>');
                additionalOptions.append('<option value="q2">2. Pomoc społeczna z zakwaterowaniem</option>');
                additionalOptions.append('<option value="q2">3. Pomoc społeczna bez zakwaterowania</option>');
            } else if (selectedValue == '18') {
                additionalOptions.append('<option value="r1">1. Działalność twórcza związana z kulturą i rozrywką</option>');
                additionalOptions.append('<option value="r2">2. Działalność bibliotek, archiwów, muzeów oraz pozostała działalność związana z kulturą</option>');
                additionalOptions.append('<option value="r2">3. Działalność związana z grami losowymi i zakładami wzajemnymi</option>');
                additionalOptions.append('<option value="r2">4. Działalność sportowa, rozrywkowa i rekreacyjna</option>');
            } else if (selectedValue == '19') {
                additionalOptions.append('<option value="s1">1. Działalność organizacji członkowskich</option>');
                additionalOptions.append('<option value="s2">2. Naprawa i konserwacja komputerów i artykułów użytku osobistego i domowego</option>');
                additionalOptions.append('<option value="s2">3. Pozostała indywidualna działalność usługowa</option>');
            } else if (selectedValue == '20') {
                additionalOptions.append('<option value="t1">1. Gospodarstwa domowe zatrudniające pracowników</option>');
                additionalOptions.append('<option value="t2">2. Gospodarstwa domowe produkujące wyroby i świadczące usługi na własne potrzeby</option>');
            } else if (selectedValue == '21') {
                additionalOptions.append('<option value="u1">1. Organizacje i zespoły eksterytorialne</option>');
            }
        } else {
            additionalOptionsDiv.addClass('d-none'); // Ukrycie sekcji z dodatkowymi opcjami
            additionalOptions.removeAttr('required'); // Usunięcie atrybutu required

        }
    });
});


// Stepper:

$(document).ready(function() {
    var currentStep = 1;

    function showStep(step) {
        $('.step').addClass('d-none');
        $('.step[data-step="' + step + '"]').removeClass('d-none');

        $('.stepper-item').removeClass('current');
        $('.stepper-item[data-step="' + step + '"]').addClass('current');

        // Przewiń stronę do góry przy przejściu na nowy krok
        window.scrollTo(0, 0);
    }

    $('.next-step').on('click', function() {
        currentStep++;
        showStep(currentStep);
    });

    $('.prev-step').on('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    // Initialize step 1 as visible
    showStep(currentStep);
});


// Repeater


$(document).ready(function() {
    console.log("Skrypt załadowany");

    // Parsowanie danych JSON z jednostkami paliw
    var fuelsUnits = JSON.parse($('#dataContainer').attr('data-fuels-units'));
    console.log('Dane fuelsUnits po parsowaniu:', fuelsUnits);

    var currentEditRow = null;  // Przechowywanie aktualnie edytowanego wiersza

    // Funkcja do dynamicznego ładowania jednostek na podstawie paliwa
    function updateUnitsForFuel(selectedFuel) {
        console.log('Wybrane paliwo:', selectedFuel);

        var units = fuelsUnits[selectedFuel];
        var unitSelect = $('#jednostka');
        unitSelect.empty();  // Wyczyść listę jednostek przed dodaniem nowych

        if (units) {
            // Dodanie opcji jednostek do pola select
            units.forEach(function(unit) {
                // Dodanie '/rok' do każdej jednostki
                var unitWithSuffix = unit + "/rok";
                unitSelect.append(new Option(unitWithSuffix, unitWithSuffix));
            });
            // Ustawienie domyślnej jednostki (pierwsza z listy)
            unitSelect.val(units[0] + "/rok");
            console.log('Dostępne jednostki dla paliwa:', units);
        } else {
            console.log('Brak dostępnych jednostek dla wybranego paliwa.');
        }
    }

// Funkcja do czyszczenia pól formularza przy dodawaniu nowego wiersza
function clearFormForNewEntry() {
    console.log("Czyszczenie formularza przed dodaniem nowego wiersza...");
    // Wyczyść pole zużycia
    $('#zuzycie').val('');  // Wyczyszczenie pola zużycia

    // Ustaw domyślne paliwo i jednostkę
    var firstFuel = $('#paliwo option:first').val();
    $('#paliwo').val(firstFuel).change();  // Wywołanie zmiany, aby załadować jednostki dla domyślnego paliwa
}

// Pokaż modalne okno po kliknięciu "Dodaj źródło emisji"
$('#dodaj_stacjonarne_btn').on('click', function() {
    currentEditRow = null;  // Ustawienie braku wiersza do edycji
    clearFormForNewEntry();  // Czyszczenie pól formularza
    $('#stacjonarneEmisjeModal').modal('show');  // Pokaż modal
});

// Dynamiczne ładowanie jednostek na podstawie wybranego paliwa
$('#paliwo').on('change', function() {
    var selectedFuel = $(this).val();
    updateUnitsForFuel(selectedFuel);  // Zaktualizowanie jednostek dla wybranego paliwa
});

// Obsługa przycisku "Zapisz"
$('#zapisz_emisje_btn').on('click', function() {
    var paliwo = $('#paliwo').val();
    var zuzycie = $('#zuzycie').val();
    var jednostka = $('#jednostka').val();

    if (!paliwo || !zuzycie || !jednostka) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
    }

    if (currentEditRow) {
        // Aktualizacja istniejącego wiersza
        console.log("Aktualizacja danych w istniejącym wierszu...");

        // Znalezienie ukrytych inputów w wierszu i aktualizacja ich wartości
        currentEditRow.find('input[name$="[paliwo]"]').val(paliwo);
        currentEditRow.find('input[name$="[zuzycie]"]').val(zuzycie);
        currentEditRow.find('input[name$="[jednostka]"]').val(jednostka);

        // Aktualizacja widocznych danych w komórkach BEZ usuwania ukrytych inputów
        currentEditRow.children('td:eq(0)').html(`${paliwo}<input type="hidden" name="stacjonarne_emissions[0][paliwo]" value="${paliwo}">`);
        currentEditRow.children('td:eq(1)').html(`${zuzycie}<input type="hidden" name="stacjonarne_emissions[0][zuzycie]" value="${zuzycie}">`);
        currentEditRow.children('td:eq(2)').html(`${jednostka}<input type="hidden" name="stacjonarne_emissions[0][jednostka]" value="${jednostka}">`);

        console.log("Po aktualizacji:", {
            paliwo: currentEditRow.find('input[name$="[paliwo]"]').val(),
            zuzycie: currentEditRow.find('input[name$="[zuzycie]"]').val(),
            jednostka: currentEditRow.find('input[name$="[jednostka]"]').val()
        });
    } else {
        // Dodanie nowego wiersza
        console.log("Dodawanie nowego wiersza...");
        var rowCount = $('#stacjonarne_emisje_table tbody tr').length;

        var newRow = `
            <tr>
                <td>
                    ${paliwo}<input type="hidden" name="stacjonarne_emissions[${rowCount}][paliwo]" value="${paliwo}">
                </td>
                <td>
                    ${zuzycie}<input type="hidden" name="stacjonarne_emissions[${rowCount}][zuzycie]" value="${zuzycie}">
                </td>
                <td>
                    ${jednostka}<input type="hidden" name="stacjonarne_emissions[${rowCount}][jednostka]" value="${jednostka}">
                </td>
                <td>
                    <a href="#" class="edit-btn">Edytuj</a> ·
                    <a href="#" class="delete-btn">Usuń</a>
                </td>
            </tr>
        `;

        $('#stacjonarne_emisje_table tbody').append(newRow);
    }

    $('#stacjonarneEmisjeModal').modal('hide');
});

// Obsługa przycisku "Anuluj"
$('#anuluj_emisje_btn').on('click', function() {
    $('#stacjonarneEmisjeModal').modal('hide');
});

// Obsługa edycji
$('#stacjonarne_emisje_table').on('click', '.edit-btn', function(e) {
    e.preventDefault();
    currentEditRow = $(this).closest('tr');  // Znajdź wiersz, który chcemy edytować

    // Pobranie wartości z wiersza za pomocą ukrytych inputów
    var paliwo = currentEditRow.find('input[name$="[paliwo]"]').val();
    var zuzycie = currentEditRow.find('input[name$="[zuzycie]"]').val();
    var jednostka = currentEditRow.find('input[name$="[jednostka]"]').val();

    // Debugging: sprawdzanie czy inputy mają poprawne wartości
    console.log("Próba edycji wiersza z danymi: ", { paliwo, zuzycie, jednostka });
    console.log("Cała struktura wiersza w DOM podczas edycji:", currentEditRow.html());

    if (!paliwo || !zuzycie || !jednostka) {
        console.error('Brak danych do edycji - wartości nieprawidłowe.');
        return;  // Przerwij edycję, jeśli brakuje danych
    }

    // Zaktualizowanie formularza edycji
    $('#paliwo').val(paliwo).change();  // Zmiana paliwa
    $('#zuzycie').val(zuzycie);  // Wprowadzenie zużycia

    // Aktualizacja jednostek
    updateUnitsForFuel(paliwo);

    // Ustawienie odpowiedniej jednostki
    $('#jednostka').val(jednostka);

    $('#stacjonarneEmisjeModal').modal('show');
});

// Obsługa usuwania
$('#stacjonarne_emisje_table').on('click', '.delete-btn', function(e) {
    e.preventDefault();
    $(this).closest('tr').remove();
});




console.log('Skrypt załadowany - mobilne źródła emisji.');

// Parsowanie danych JSON z pojazdami

var mobilneDataContainer = document.getElementById('mobilneDataContainer');
console.log(mobilneDataContainer.getAttribute('data-vehicles-data'));
var vehiclesData = JSON.parse(mobilneDataContainer.getAttribute('data-vehicles-data'));
console.log('Dane vehiclesData:', vehiclesData);

// Iterowanie przez dane i wyświetlanie każdego wiersza w konsoli
//vehiclesData.forEach(function(vehicle) {
//    console.log('Pojazd:', vehicle.column_text, 'UOM:', vehicle.uom, 'GHG Unit:', vehicle.ghg_unit, 'Factor:', vehicle.conversion_factor);
//});


    // Inicjalizacja dla energii elektrycznej
    $('#kt_docs_repeater_energia_elektryczna').repeater({
        initEmpty: false,
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        },
        ready: function (setIndexes) {
            console.log("Repeater for energia elektryczna is ready and initialized.");
        }
    });

    // Inicjalizacja dla energii cieplnej
    $('#kt_docs_repeater_energia_cieplna').repeater({
        initEmpty: false,
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        },
        ready: function (setIndexes) {
            console.log("Repeater for energia cieplna is ready and initialized.");
        }
    });

    // Tutaj dodajemy logowanie przed wysłaniem formularza:
    $('#stepper-form').on('submit', function (event) {
        event.preventDefault(); // Zatrzymanie domyślnego wysłania formularza dla analizy

        // Logowanie danych formularza i repeaterów
        var formData = $(this).serializeArray();
        console.log("Całe dane formularza: ", formData);

        var stacjonarneData = $('#kt_docs_repeater_stacjonarne').repeaterVal();
        console.log("Dane stacjonarnych emisji:", stacjonarneData);

        var mobilneData = $('#kt_docs_repeater_mobilne').repeaterVal();
        console.log("Dane mobilnych emisji:", mobilneData);

        var energiaElektrycznaData = $('#kt_docs_repeater_energia_elektryczna').repeaterVal();
        console.log("Dane energii elektrycznej:", energiaElektrycznaData);

        var energiaCieplnaData = $('#kt_docs_repeater_energia_cieplna').repeaterVal();
        console.log("Dane energii cieplnej:", energiaCieplnaData);

        // Programowe wysłanie formularza po sprawdzeniu danych
        this.submit();
    });
    });


// SQL - Obsługa pierwszego formularza
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skrypt załadowany');

    // Pobierz dane JSON dla paliw
    var dataContainer = document.getElementById('dataContainer');
    var fuelsUnits = JSON.parse(dataContainer.getAttribute('data-fuels-units'));
    console.log('Dane fuelsUnits:', fuelsUnits);

    var fuelSelects = document.querySelectorAll('select[name="paliwo"]');
    var unitSelects = document.querySelectorAll('select[name="jednostka"]');

    fuelSelects.forEach(function(fuelSelect, index) {
        fuelSelect.addEventListener('change', function() {
            var selectedFuel = this.value.trim();  // Usuń spacje na początku i końcu
            var unitSelect = unitSelects[index];
            unitSelect.innerHTML = ''; // Opróżnij obecne opcje jednostki
            console.log('Wybrane paliwo:', selectedFuel);

            if (fuelsUnits[selectedFuel]) {
                console.log('Dostępne jednostki dla paliwa:', fuelsUnits[selectedFuel]);
                fuelsUnits[selectedFuel].forEach(function(unit) {
                    var option = document.createElement('option');
                    option.value = unit;
                    option.text = unit;
                    unitSelect.appendChild(option);
                });
            } else {
                console.log('Brak dostępnych jednostek dla wybranego paliwa.');
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', function () {
    const modal = new bootstrap.Modal(document.getElementById('mobilneEmisjeModal'));
    const mobilneEmisjeTableBody = document.querySelector('#mobilne_emisje_table tbody');

    const vehiclesData = JSON.parse(document.getElementById('mobilneDataContainer').getAttribute('data-vehicles-data'));

    // Funkcja do wypełnienia opcji w modalnym oknie
    function populateModalOptions() {
        const rodzajPojazduSelect = document.getElementById('rodzaj_pojazdu_modal');
        const level2Select = document.getElementById('level2_modal');
        const level3Select = document.getElementById('level3_modal');
        const sposobZasilaniaSelect = document.getElementById('sposob_zasilania_modal');
        const jednostkaSelect = document.getElementById('jednostka_modal'); // Dodanie select dla jednostek

        // Czyścimy opcje przed załadowaniem
        rodzajPojazduSelect.innerHTML = '<option></option>';
        level2Select.innerHTML = '<option></option>';
        level3Select.innerHTML = '<option></option>';
        sposobZasilaniaSelect.innerHTML = '<option></option>';
        jednostkaSelect.innerHTML = '<option></option>'; // Czyścimy jednostki

        // Dodawanie opcji do "Rodzaj pojazdu" (Level 1)
        const uniqueVehicles = new Set();
        vehiclesData.forEach(vehicle => {
            if (!uniqueVehicles.has(vehicle.level1)) {
                uniqueVehicles.add(vehicle.level1);
                const optionVehicle = document.createElement('option');
                optionVehicle.value = vehicle.level1;
                optionVehicle.text = vehicle.level1;
                rodzajPojazduSelect.appendChild(optionVehicle);
            }
        });

        // Dodawanie opcji do "Sposób zasilania"
        const uniqueFuelTypes = new Set();
        vehiclesData.forEach(vehicle => {
            if (!uniqueFuelTypes.has(vehicle.column_text)) {
                uniqueFuelTypes.add(vehicle.column_text);
                const optionFuel = document.createElement('option');
                optionFuel.value = vehicle.column_text;
                optionFuel.text = vehicle.column_text;
                sposobZasilaniaSelect.appendChild(optionFuel);
            }
        });

        // Dodaj listener na zmiany w Level 1 (Rodzaj pojazdu)
        rodzajPojazduSelect.addEventListener('change', function () {
            const selectedVehicle = this.value;
            loadNextLevel(2, selectedVehicle, level2Select); // Ładuj opcje dla Level 2
        });

        // Dodaj listener na zmiany w Level 2
        level2Select.addEventListener('change', function () {
            const selectedLevel2 = this.value;
            loadNextLevel(3, selectedLevel2, level3Select); // Ładuj opcje dla Level 3
        });

        // Dodaj listener na zmiany w Level 3 i aktualizuj jednostki
        level3Select.addEventListener('change', function () {
            const selectedLevel3 = this.value;
            updateUnitsForLevel3(selectedLevel3); // Aktualizuj jednostki dla wybranego Level 3
        });
    }

    // Funkcja do aktualizacji jednostek na podstawie wybranego Level 3
function updateUnitsForLevel3(selectedLevel3) {
    const jednostkaSelect = document.getElementById('jednostka_modal');
    jednostkaSelect.innerHTML = '<option></option>'; // Czyścimy listę jednostek

    // Filtruj dane vehiclesData, aby znaleźć odpowiednie jednostki dla wybranego Level 3
    const filteredUnits = vehiclesData.filter(vehicle => vehicle.column_text === selectedLevel3)
                                      .map(vehicle => vehicle.uom);

    console.log('Filtered units:', filteredUnits); // Dodaj ten log, aby zobaczyć wyniki filtrowania

    // Dodaj jednostki do select
    filteredUnits.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit + '/rok'; // Dodanie "/rok" do jednostki
        option.text = unit + '/rok';
        jednostkaSelect.appendChild(option);
    });

    // Ustaw pierwszą jednostkę jako domyślną, jeśli istnieją
    if (filteredUnits.length > 0) {
        jednostkaSelect.value = filteredUnits[0] + '/rok';
    } else {
        jednostkaSelect.appendChild(new Option("Brak jednostek", ""));
    }
}

    // Funkcja AJAX do załadowania kolejnych opcji
    function loadNextLevel(level, selectedValue, targetSelect) {
        fetch(`/get_options?level=${level}&selectedValue=${selectedValue}`)
            .then(response => response.json())
            .then(data => {
                targetSelect.innerHTML = '<option></option>';
                data.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.text = option;
                    targetSelect.appendChild(opt);
                });
            })
            .catch(error => {
                console.error('Błąd podczas ładowania opcji dla poziomu ' + level + ':', error);
            });
    }

    // Funkcja do dodawania wiersza do tabeli
    function addRowToTable(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${liczbaPojazdow}</td>
            <td>${rodzajPojazdu}</td>
            <td>${level2}</td>
            <td>${level3}</td>
            <td>${sposobZasilania}</td>
            <td>${zuzyciePaliwa}</td>
            <td>${jednostka}</td>
            <td><button type="button" class="btn btn-danger btn-sm remove-vehicle">Usuń</button></td>
        `;
        mobilneEmisjeTableBody.appendChild(row);
    }

    // Event listener na przycisk "Dodaj pojazd"
    document.getElementById('dodaj_mobilne_btn').addEventListener('click', function () {
        populateModalOptions(); // Wypełnij modal opcjami
        modal.show(); // Otwórz modal
    });

    // Event listener na przycisk "Zapisz" w modalu
    document.getElementById('zapisz_mobilne_btn').addEventListener('click', function () {
        const liczbaPojazdow = document.getElementById('liczba_pojazdow_modal').value;
        const rodzajPojazdu = document.getElementById('rodzaj_pojazdu_modal').value;
        const level2 = document.getElementById('level2_modal').value;
        const level3 = document.getElementById('level3_modal').value;
        const sposobZasilania = document.getElementById('sposob_zasilania_modal').value;
        const zuzyciePaliwa = document.getElementById('zuzycie_paliwa_modal').value;
        const jednostka = document.getElementById('jednostka_modal').value;

        // Walidacja - sprawdź, czy wszystkie pola są wypełnione
        if (liczbaPojazdow && rodzajPojazdu && level2 && level3 && sposobZasilania && zuzyciePaliwa && jednostka) {
            addRowToTable(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka);
            modal.hide(); // Zamknij modal po dodaniu
        } else {
            alert("Proszę wypełnić wszystkie pola!");
        }
    });

    // Event listener do usuwania wierszy
    mobilneEmisjeTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-vehicle')) {
            event.target.closest('tr').remove(); // Usuwa wiersz tabeli
        }
    });
});







// Wykresy:

document.addEventListener('DOMContentLoaded', function() {
    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var ctxBar = document.getElementById('barChart').getContext('2d');

    var pieChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Zakres 1', 'Zakres 2'],
            datasets: [{
                data: [2.97, 124.75],
                backgroundColor: ['#4caf50', '#ff9800']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        }
    });

    var barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Energia elektryczna', 'Energia cieplna'],
            datasets: [{
                label: 'Zakres 2 - location-based',
                data: [80810, 43940],
                backgroundColor: '#3e95cd'
            }, {
                label: 'Zakres 2 - market-based',
                data: [70000, 30000], // Przykładowe dane
                backgroundColor: '#8e5ea2'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            }
        }
    });
});