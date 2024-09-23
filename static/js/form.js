
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



const mobilneEmisjeTableBody = document.querySelector('#mobilne_emisje_table tbody');
$(document).ready(function() {
    console.log("Skrypt załadowany");
    // Zmienna globalna przechowująca aktualnie edytowany wiersz
let editedRow = null;

// Tablica do przechowywania wyników obliczeń dla każdej pozycji
let emissionCalculations = [];
    // Parsowanie danych JSON z jednostkami paliw
    var fuelsUnits = JSON.parse($('#dataContainer').attr('data-fuels-units'));
//    console.log('Dane fuelsUnits po parsowaniu:', fuelsUnits);

    var currentEditRow = null;  // Przechowywanie aktualnie edytowanego wiersza


// Funkcja do obliczania emisji i aktualizacji modala dla mobilnych źródeł emisji
function addEmissionCalculationForMobile(results, zuzycie, paliwo, jednostka) {
    const CO2e = zuzycie * results.CO2e;
    const CO2 = zuzycie * results.CO2;
    const CH4 = zuzycie * results.CH4;
    const N2O = zuzycie * results.N2O;
    const totalEmission = CO2e + CO2 + CH4 + N2O;

    // Dodaj wyniki do tablicy przechowującej obliczenia
    emissionCalculations.push({
        paliwo: paliwo,
        zuzycie: zuzycie,
        jednostka: jednostka,
        CO2e: CO2e.toFixed(2),
        CO2: CO2.toFixed(2),
        CH4: CH4.toFixed(2),
        N2O: N2O.toFixed(2),
        totalEmission: totalEmission.toFixed(2),
    });

    updateModalWithCalculations(); // Zaktualizuj modal
}
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
<td>
    <div class="d-flex justify-content-start gap-2">
        <button type="button" class="btn btn-warning btn-sm edit-vehicle">Edytuj</button>
        <button type="button" class="btn btn-danger btn-sm remove-vehicle">Usuń</button>
    </div>
</td>

    `;
    mobilneEmisjeTableBody.appendChild(row);
}


// Obsługa przycisku "Zapisz" w modalu
document.getElementById('zapisz_mobilne_btn').addEventListener('click', function () {
    // Pobieranie wartości z formularza
    const liczbaPojazdow = document.getElementById('liczba_pojazdow_modal').value;
    const rodzajPojazdu = document.getElementById('rodzaj_pojazdu_modal').value;
    const level2 = document.getElementById('level2_modal').value;
    const level3 = document.getElementById('level3_modal').value;
    const sposobZasilania = document.getElementById('sposob_zasilania_modal').value;
    const zuzyciePaliwa = document.getElementById('zuzycie_paliwa_modal').value;
    const jednostka = document.getElementById('jednostka_modal').value;

    // Przesyłanie danych do backendu
    fetch('/fetch_emission_factors_mobilne', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            level1: rodzajPojazdu,
            level2: level2,
            level3: level3,
            jednostka: jednostka,
            fuel_type: sposobZasilania,
            ilosc: zuzyciePaliwa
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Otrzymane wskaźniki emisji dla mobilnych:', data);

        // Dodanie obliczeń do tabeli
        addEmissionCalculationForMobile(data, zuzyciePaliwa, rodzajPojazdu, jednostka);

        // Zamknij modal dodawania pojazdu przed wyświetleniem modala z obliczeniami
        $('#mobilneEmisjeModal').modal('hide');

        // Wyświetlenie wyników w oknie modalnym
        showEmissionCalculationsModal();
    })
    .catch(error => {
        console.error('Błąd przy pobieraniu wskaźników emisji:', error);
    });

    // Sprawdzenie wypełnienia wszystkich pól i dodanie lub aktualizacja wiersza
    if (liczbaPojazdow && rodzajPojazdu && level2 && level3 && sposobZasilania && zuzyciePaliwa && jednostka) {
        if (editedRow) {
            // Aktualizacja istniejącego wiersza
            editedRow.cells[0].textContent = liczbaPojazdow;
            editedRow.cells[1].textContent = rodzajPojazdu;
            editedRow.cells[2].textContent = level2;
            editedRow.cells[3].textContent = level3;
            editedRow.cells[4].textContent = sposobZasilania;
            editedRow.cells[5].textContent = zuzyciePaliwa;
            editedRow.cells[6].textContent = jednostka;
            editedRow = null; // Resetowanie zmiennej po edycji
        } else {
            // Dodanie nowego wiersza do tabeli
            addRowToTable(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka);
        }
        clearMobilneEmisjeForm(); // Czyści formularz po zapisaniu
        console.log('Dane zostały zapisane, modal zamknięty');
    } else {
        alert("Proszę wypełnić wszystkie pola!");
    }
});



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


// Główna funkcja obsługująca zapis i edycję emisji
function handleSaveEmission() {
    var paliwo = $('#paliwo').val();
    var zuzycie = parseFloat($('#zuzycie').val());
    var jednostka = $('#jednostka').val();

    if (!paliwo || !zuzycie || !jednostka) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
    }

    // Tworzenie obiektu z danymi do wysłania
    const emissionData = {
        level3: paliwo,
        jednostka: jednostka,
        ilosc: zuzycie
    };

    console.log('Dane do pobrania wskaźników emisji:', emissionData);

    // Wysłanie danych do backendu w celu pobrania wskaźników emisji
    fetch('/fetch_emission_factors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emissionData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Otrzymane wskaźniki emisji:', data);

            // Przy każdej edycji, wykonaj obliczenia z pobranymi danymi
            if (currentEditRow) {
                updateExistingRow(paliwo, zuzycie, jednostka, data);
            } else {
                addNewRow(paliwo, zuzycie, jednostka, data);
            }

            // Zamknięcie modala po operacji
            $('#stacjonarneEmisjeModal').modal('hide');
        })
        .catch(error => {
            console.error('Błąd przy pobieraniu wskaźników emisji:', error);
            alert('Wystąpił błąd przy pobieraniu wskaźników emisji.');
        });
}


function updateExistingRowMobile(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka) {
    console.log("Aktualizacja danych w istniejącym wierszu mobilnym...");

    editedRow.cells[0].textContent = liczbaPojazdow;
    editedRow.cells[1].textContent = rodzajPojazdu;
    editedRow.cells[2].textContent = level2;
    editedRow.cells[3].textContent = level3;
    editedRow.cells[4].textContent = sposobZasilania;
    editedRow.cells[5].textContent = zuzyciePaliwa;
    editedRow.cells[6].textContent = jednostka;

    // Resetowanie zmiennej po zakończeniu edycji
    editedRow = null;

    // Wyświetlenie modala z zaktualizowanymi obliczeniami po edycji wiersza
    showEmissionCalculationsModal();
}


function handleSaveMobileEmission() {
    var liczbaPojazdow = parseFloat($('#liczba_pojazdow_modal').val());
    var rodzajPojazdu = $('#rodzaj_pojazdu_modal').val();
    var level2 = $('#level2_modal').val();
    var level3 = $('#level3_modal').val();
    var sposobZasilania = $('#sposob_zasilania_modal').val();
    var zuzyciePaliwa = parseFloat($('#zuzycie_paliwa_modal').val());
    var jednostka = $('#jednostka_modal').val();

    if (!liczbaPojazdow || !rodzajPojazdu || !level2 || !level3 || !sposobZasilania || !zuzyciePaliwa || !jednostka) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
    }

    const emissionData = {
        level3: level3,
        jednostka: jednostka,
        ilosc: zuzyciePaliwa,
    };

    console.log('Dane do pobrania wskaźników emisji dla mobilnych:', emissionData);

    fetch('/fetch_emission_factors_mobilne', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emissionData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Otrzymane wskaźniki emisji dla mobilnych:', data);

            // Sprawdzenie, czy wiersz jest edytowany
            if (editedRow) {
                // Aktualizacja istniejącego wiersza
                updateExistingRowMobile(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka);
            } else {
                // Dodanie nowego wiersza do tabeli
                addRowToTable(liczbaPojazdow, rodzajPojazdu, level2, level3, sposobZasilania, zuzyciePaliwa, jednostka);
            }

            // Zamknięcie modala po operacji
            $('#mobilneEmisjeModal').modal('hide');
        })
        .catch((error) => {
            console.error('Błąd przy pobieraniu wskaźników emisji:', error);
            alert('Wystąpił błąd przy pobieraniu wskaźników emisji.');
        });
}






// Obsługa przycisku "Zapisz" - jedno miejsce do obsługi zapisów i edycji
$('#zapisz_emisje_btn').on('click', handleSaveEmission);

// Funkcja do dodawania nowego wiersza do tabeli
function addNewRow(paliwo, zuzycie, jednostka, data) {
    console.log("Dodawanie nowego wiersza...");
    var rowCount = $('#stacjonarne_emisje_table tbody tr').length;
    var newRow = `
        <tr>
            <td>${paliwo}<input type="hidden" name="stacjonarne_emissions[${rowCount}][paliwo]" value="${paliwo}"></td>
            <td>${zuzycie}<input type="hidden" name="stacjonarne_emissions[${rowCount}][zuzycie]" value="${zuzycie}"></td>
            <td>${jednostka}<input type="hidden" name="stacjonarne_emissions[${rowCount}][jednostka]" value="${jednostka}"></td>
            <td>
                <div class="d-flex justify-content-start gap-2">
                    <a href="#" class="edit-btn btn btn-warning btn-sm">Edytuj</a>
                    <a href="#" class="delete-btn btn btn-danger btn-sm">Usuń</a>
                </div>
            </td>
        </tr>
    `;
    $('#stacjonarne_emisje_table tbody').append(newRow);
    addEmissionCalculation(data, zuzycie, paliwo, jednostka);  // Dodanie wyliczeń do podsumowania

    // Wyświetlenie modala z obliczeniami po dodaniu nowego wiersza
    showEmissionCalculationsModal();
}

// Funkcja do aktualizacji istniejącego wiersza z pobieraniem nowych danych
function updateExistingRow(paliwo, zuzycie, jednostka, data) {
    console.log("Aktualizacja danych w istniejącym wierszu...");

    currentEditRow.find('input[name$="[paliwo]"]').val(paliwo);
    currentEditRow.find('input[name$="[zuzycie]"]').val(zuzycie);
    currentEditRow.find('input[name$="[jednostka]"]').val(jednostka);

    currentEditRow.children('td:eq(0)').html(`${paliwo}<input type="hidden" name="stacjonarne_emissions[0][paliwo]" value="${paliwo}">`);
    currentEditRow.children('td:eq(1)').html(`${zuzycie}<input type="hidden" name="stacjonarne_emissions[0][zuzycie]" value="${zuzycie}">`);
    currentEditRow.children('td:eq(2)').html(`${jednostka}<input type="hidden" name="stacjonarne_emissions[0][jednostka]" value="${jednostka}">`);

    // Aktualizacja wyliczeń dla edytowanego rekordu
    updateEmissionCalculation(currentEditRow.index(), data, zuzycie, paliwo, jednostka); // Dodajemy jednostkę


    // Wyświetlenie modala z zaktualizowanymi obliczeniami po edycji wiersza
    showEmissionCalculationsModal();
}

// Funkcja do aktualizacji treści modala z wynikami
function updateModalWithCalculations() {
    let totalEmissions = 0;
    let resultsHtml = `<h6>Obliczenia dla każdego dodanego źródła emisji:</h6>`;

    // Iteracja przez wszystkie obliczenia i tworzenie HTML
    emissionCalculations.forEach((calc, index) => {
        totalEmissions += parseFloat(calc.totalEmission); // Sumujemy emisję każdej pozycji
        resultsHtml += `
            <h6>Pozycja ${index + 1}: ${calc.paliwo}</h6>
            <p>Zużycie: ${calc.zuzycie} ${calc.jednostka}</p>
            <p>CO2e (ogólne): ${calc.CO2e} kg CO2e</p>
            <p>CO2 (CO2 na jednostkę): ${calc.CO2} kg CO2e</p>
            <p>CH4 (CH4 na jednostkę): ${calc.CH4} kg CO2e CH4</p>
            <p>N2O (N2O na jednostkę): ${calc.N2O} kg CO2e N2O</p>
            <p>Sumaryczny ślad węglowy tej pozycji: ${calc.totalEmission} kg CO2e</p>
        `;
    });

    // Dodanie sumarycznego śladu węglowego dla wszystkich pozycji
    resultsHtml += `<p>Sumaryczny ślad węglowy wszystkich pozycji: ${totalEmissions.toFixed(2)} kg CO2e</p>`;

    // Wyświetlenie wyników w oknie modalnym
    $('#emissionResults').html(resultsHtml);
    const modal = new bootstrap.Modal(document.getElementById('emissionCalculationsModal'));
    modal.show();
}


// Funkcja do dodawania obliczeń do listy i aktualizacji modala
function addEmissionCalculation(results, ilosc, paliwo, jednostka) {
    const CO2e = ilosc * results.CO2e;
    const CO2 = ilosc * results.CO2;
    const CH4 = ilosc * results.CH4;
    const N2O = ilosc * results.N2O;
    const totalEmission = CO2e + CO2 + CH4 + N2O;

    // Dodajemy wyniki do tablicy przechowującej obliczenia
    emissionCalculations.push({
        paliwo: paliwo,
        zuzycie: ilosc,
        jednostka: jednostka, // Zapisujemy jednostkę
        CO2e: CO2e.toFixed(2),
        CO2: CO2.toFixed(2),
        CH4: CH4.toFixed(2),
        N2O: N2O.toFixed(2),
        totalEmission: totalEmission.toFixed(2),
    });

    updateModalWithCalculations(); // Zaktualizuj modal
}




// Funkcja do aktualizacji obliczeń w tablicy po edycji
function updateEmissionCalculation(index, results, ilosc, paliwo, jednostka) {
    const CO2e = ilosc * results.CO2e;
    const CO2 = ilosc * results.CO2;
    const CH4 = ilosc * results.CH4;
    const N2O = ilosc * results.N2O;
    const totalEmission = CO2e + CO2 + CH4 + N2O;

    if (emissionCalculations[index]) {
        // Aktualizacja obliczeń w istniejącym indeksie
        emissionCalculations[index] = {
            paliwo: paliwo,
            zuzycie: ilosc,
            jednostka: jednostka, // Zapisujemy jednostkę
            CO2e: CO2e.toFixed(2),
            CO2: CO2.toFixed(2),
            CH4: CH4.toFixed(2),
            N2O: N2O.toFixed(2),
            totalEmission: totalEmission.toFixed(2),
        };

        console.log('Zaktualizowano obliczenia:', emissionCalculations[index]);
    } else {
        console.error('Błąd: próba aktualizacji nieistniejącego rekordu!');
    }

    updateModalWithCalculations(); // Zaktualizuj modal
}



// Funkcja do aktualizacji treści modala z wynikami i wyświetlania go
function showEmissionCalculationsModal() {
    if (emissionCalculations.length > 0) {
        let resultsHtml = `<h6>Obliczenia dla każdego dodanego źródła emisji:</h6>`;
        let totalOverallEmission = 0;

        // Iteracja przez wszystkie obliczenia i tworzenie HTML
        emissionCalculations.forEach((calc, index) => {
            totalOverallEmission += parseFloat(calc.totalEmission);
            resultsHtml += `
                <h6>Pozycja ${index + 1}: ${calc.paliwo}</h6>
                <p>Zużycie: ${calc.zuzycie} ${calc.jednostka}</p>
                <p>CO2e (ogólne): ${calc.CO2e} kg CO2e</p>
                <p>CO2 (CO2 na jednostkę): ${calc.CO2} kg CO2e</p>
                <p>CH4 (CH4 na jednostkę): ${calc.CH4} kg CO2e CH4</p>
                <p>N2O (N2O na jednostkę): ${calc.N2O} kg CO2e N2O</p>
                <p>Sumaryczny ślad węglowy tej pozycji: ${calc.totalEmission} kg CO2e</p>
            `;
        });

        // Dodanie całkowitego śladu węglowego wszystkich pozycji
        resultsHtml += `<h6>Sumaryczny ślad węglowy wszystkich pozycji: ${totalOverallEmission.toFixed(2)} kg CO2e</h6>`;

        // Wyświetlenie wyników w oknie modalnym
        $('#emissionResults').html(resultsHtml);
        const modal = new bootstrap.Modal(document.getElementById('emissionCalculationsModal'));
        modal.show();
    }
}





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
    var zuzycie = parseFloat(currentEditRow.find('input[name$="[zuzycie]"]').val());
    var jednostka = currentEditRow.find('input[name$="[jednostka]"]').val();

    // Debugging: sprawdzanie czy inputy mają poprawne wartości
    console.log("Próba edycji wiersza z danymi: ", { paliwo, zuzycie, jednostka });

    if (!paliwo || !zuzycie || !jednostka) {
        console.error('Brak danych do edycji - wartości nieprawidłowe.');
        return;  // Przerwij edycję, jeśli brakuje danych
    }

    // Zaktualizowanie formularza edycji
    $('#paliwo').val(paliwo).change();  // Zmiana paliwa
    $('#zuzycie').val(zuzycie);  // Wprowadzenie zużycia
    updateUnitsForFuel(paliwo);  // Aktualizacja jednostek dla wybranego paliwa
    $('#jednostka').val(jednostka);

    $('#stacjonarneEmisjeModal').modal('show');
});


// Obsługa usuwania
$('#stacjonarne_emisje_table').on('click', '.delete-btn', function(e) {
    e.preventDefault();
    const rowIndex = $(this).closest('tr').index();
    // Usuń element z tablicy obliczeń
    emissionCalculations.splice(rowIndex, 1);
    $(this).closest('tr').remove();

    // Sprawdzenie, czy są jakieś obliczenia po usunięciu wiersza
    if (emissionCalculations.length > 0) {
        showEmissionCalculationsModal(); // Aktualizuj modal tylko, jeśli są obliczenia
    } else {
        // Ukryj modal, jeśli nie ma żadnych emisji
        const modal = bootstrap.Modal.getInstance(document.getElementById('emissionCalculationsModal'));
        if (modal) modal.hide();
    }
});





console.log('Skrypt załadowany - mobilne źródła emisji.');

// Parsowanie danych JSON z pojazdami

//var mobilneDataContainer = document.getElementById('mobilneDataContainer');
//console.log(mobilneDataContainer.getAttribute('data-vehicles-data'));
//var vehiclesData = JSON.parse(mobilneDataContainer.getAttribute('data-vehicles-data'));
//console.log('Dane vehiclesData:', vehiclesData);

// Sprawdzenie struktury obiektów w vehiclesData
//console.log('Pełne dane vehiclesData (struktura obiektów):');
//vehiclesData.forEach((vehicle, index) => {
//    console.log(`Obiekt ${index}:`, vehicle);
//    console.log('Dostępne klucze w obiekcie:', Object.keys(vehicle)); // Wyświetlenie dostępnych kluczy
//});


// Inicjalizacja dla energii elektrycznej
$('#kt_docs_repeater_energia_elektryczna').repeater({
    initEmpty: true,
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

// Funkcja czyszcząca formularz energii elektrycznej
function clearEnergiaElektrycznaForm() {
    $('#energia_elektryczna_form').trigger("reset"); // Resetuje cały formularz
    editedRow = null; // Resetuje zmienną edycji
}


// Otwieranie modala i czyszczenie formularza przed dodaniem nowego dostawcy
$('#dodaj_energia_elektryczna_btn').on('click', function() {
    clearEnergiaElektrycznaForm(); // Czyści formularz
    $('#energiaElektrycznaModal').modal('show'); // Otwiera modal
});

// Obsługa przycisku "Zapisz" dla energii elektrycznej
$('#zapisz_energia_elektryczna_btn').on('click', function() {
    const pochodzenie = $('input[name="pochodzenie_energii"]:checked').val();
    const dostawca = $('#dostawca_energia_elektryczna').val();
    const zuzycie = $('#zuzycie_energia_elektryczna').val();
    const jednostka = $('#jednostka_energia_elektryczna').val();

    if (pochodzenie && dostawca && zuzycie && jednostka) {
        if (editedRow) {
            // Aktualizacja istniejącego wiersza
            editedRow.find('td:eq(0)').text(pochodzenie === 'oze' ? 'OZE' : 'nie OZE');
            editedRow.find('td:eq(1)').text(dostawca);
            editedRow.find('td:eq(2)').text(zuzycie);
            editedRow.find('td:eq(3)').text(jednostka);
            editedRow = null; // Resetowanie zmiennej po edycji
        } else {
            // Dodanie nowego wiersza do tabeli
            $('#energia_elektryczna_table tbody').append(`
                <tr>
                    <td>${pochodzenie === 'oze' ? 'OZE' : 'nie OZE'}</td>
                    <td>${dostawca}</td>
                    <td>${zuzycie}</td>
                    <td>${jednostka}</td>
                    <td>
                    <div class="d-flex justify-content-start gap-2">
                        <button type="button" class="btn btn-warning btn-sm edit-entry">Edytuj</button>
                        <button type="button" class="btn btn-danger btn-sm remove-entry">Usuń</button>
                    </div>
                    </td>
                </tr>
            `);
        }
        clearEnergiaElektrycznaForm(); // Czyści formularz po zapisaniu
        $('#energiaElektrycznaModal').modal('hide');
    } else {
        alert("Proszę wypełnić wszystkie pola!");
    }
});

// Obsługa przycisku "Usuń" dla energii elektrycznej
$('#energia_elektryczna_table').on('click', '.remove-entry', function() {
    $(this).closest('tr').remove();
});

// Obsługa przycisku "Edytuj" dla energii elektrycznej
$('#energia_elektryczna_table').on('click', '.edit-entry', function() {
    clearEnergiaElektrycznaForm(); // Czyści formularz przed edycją
    editedRow = $(this).closest('tr'); // Przechowuje aktualnie edytowany wiersz

    // Pobieranie wartości z edytowanego wiersza
    const pochodzenie = editedRow.find('td:eq(0)').text() === 'OZE' ? 'oze' : 'nie_oze';
    const dostawca = editedRow.find('td:eq(1)').text();
    const zuzycie = editedRow.find('td:eq(2)').text();
    const jednostka = editedRow.find('td:eq(3)').text();

    // Ustawianie wartości w formularzu
    $(`input[name="pochodzenie_energii"][value="${pochodzenie}"]`).prop('checked', true);
    $('#dostawca_energia_elektryczna').val(dostawca);
    $('#zuzycie_energia_elektryczna').val(zuzycie);
    $('#jednostka_energia_elektryczna').val(jednostka);

    $('#energiaElektrycznaModal').modal('show'); // Otwieranie modala do edycji
});



// Inicjalizacja dla energii cieplnej
$('#kt_docs_repeater_energia_cieplna').repeater({
    initEmpty: true,
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

// Funkcja czyszcząca formularz energii cieplnej
function clearEnergiaCieplnaForm() {
    $('#energia_cieplna_form').trigger("reset"); // Resetuje cały formularz
    editedRow = null; // Resetuje zmienną edycji
}


// Otwieranie modala i czyszczenie formularza przed dodaniem nowego dostawcy
$('#dodaj_energia_cieplna_btn').on('click', function() {
    clearEnergiaCieplnaForm(); // Czyści formularz
    $('#energiaCieplnaModal').modal('show'); // Otwiera modal
});

// Obsługa przycisku "Zapisz" dla energii cieplnej
$('#zapisz_energia_cieplna_btn').on('click', function() {
    const dostawca = $('#dostawca_energia_cieplna').val();
    const zuzycie = $('#zuzycie_energia_cieplna').val();
    const jednostka = $('#jednostka_energia_cieplna').val();

    if (dostawca && zuzycie && jednostka) {
        if (editedRow) {
            // Aktualizacja istniejącego wiersza
            editedRow.find('td:eq(0)').text(dostawca);
            editedRow.find('td:eq(1)').text(zuzycie);
            editedRow.find('td:eq(2)').text(jednostka);
            editedRow = null; // Resetowanie zmiennej po edycji
        } else {
            // Dodanie nowego wiersza do tabeli
            $('#energia_cieplna_table tbody').append(`
                <tr>
                    <td>${dostawca}</td>
                    <td>${zuzycie}</td>
                    <td>${jednostka}</td>
                    <td>
                    <div class="d-flex justify-content-start gap-2">
                        <button type="button" class="btn btn-warning btn-sm edit-entry">Edytuj</button>
                        <button type="button" class="btn btn-danger btn-sm remove-entry">Usuń</button>
                    </div>
                    </td>
                </tr>
            `);
        }
        clearEnergiaCieplnaForm(); // Czyści formularz po zapisaniu
        $('#energiaCieplnaModal').modal('hide');
    } else {
        alert("Proszę wypełnić wszystkie pola!");
    }
});

// Obsługa przycisku "Usuń" dla energii cieplnej
$('#energia_cieplna_table').on('click', '.remove-entry', function() {
    $(this).closest('tr').remove();
});

// Obsługa przycisku "Edytuj" dla energii cieplnej
$('#energia_cieplna_table').on('click', '.edit-entry', function() {
    clearEnergiaCieplnaForm(); // Czyści formularz przed edycją
    editedRow = $(this).closest('tr'); // Przechowuje aktualnie edytowany wiersz

    // Pobieranie wartości z edytowanego wiersza
    const dostawca = editedRow.find('td:eq(0)').text();
    const zuzycie = editedRow.find('td:eq(1)').text();
    const jednostka = editedRow.find('td:eq(2)').text();

    // Ustawianie wartości w formularzu
    $('#dostawca_energia_cieplna').val(dostawca);
    $('#zuzycie_energia_cieplna').val(zuzycie);
    $('#jednostka_energia_cieplna').val(jednostka);

    $('#energiaCieplnaModal').modal('show'); // Otwieranie modala do edycji
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



// SQL - Obsługa pierwszego formularza
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skrypt załadowany');

    // Pobierz dane JSON dla paliw
    var dataContainer = document.getElementById('dataContainer');
    var fuelsUnits = JSON.parse(dataContainer.getAttribute('data-fuels-units'));
//    console.log('Dane fuelsUnits:', fuelsUnits);

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

// Mobile zrodla emisji



});
// Funkcja czyszcząca formularz mobilnych emisji
function clearMobilneEmisjeForm() {
    document.getElementById('mobilne_emisje_form').reset(); // Resetuje wszystkie pola formularza
    editedRow = null; // Resetuje zmienną edycji (jeśli będziemy jej później używać)
}

document.addEventListener('DOMContentLoaded', function () {
    const modal = new bootstrap.Modal(document.getElementById('mobilneEmisjeModal'));


    const vehiclesData = JSON.parse(document.getElementById('mobilneDataContainer').getAttribute('data-vehicles-data'));
//    console.log('Pełne dane vehiclesData:', vehiclesData);
// Przypisanie elementu do zmiennej na początku skryptu
const level3Select = document.getElementById('level3_modal');

// Funkcja do wypełnienia opcji w modalnym oknie
function populateModalOptions() {
    const rodzajPojazduSelect = document.getElementById('rodzaj_pojazdu_modal');
    const level2Select = document.getElementById('level2_modal');
    const sposobZasilaniaSelect = document.getElementById('sposob_zasilania_modal');
    const jednostkaSelect = document.getElementById('jednostka_modal');

    // Sprawdzenie czy level3Select jest prawidłowo przypisany
    if (!level3Select) {
        console.error('level3Select element nie został znaleziony.');
        return;
    }

    // Czyścimy opcje przed załadowaniem
    rodzajPojazduSelect.innerHTML = '<option></option>';
    level2Select.innerHTML = '<option></option>';
    level3Select.innerHTML = '<option></option>';
    sposobZasilaniaSelect.innerHTML = '<option></option>';
    jednostkaSelect.innerHTML = '<option></option>';

        // Dodawanie opcji do "Rodzaj pojazdu" (Level 1)
        const uniqueVehicles = [...new Set(vehiclesData.map(vehicle => vehicle.level1))];
        uniqueVehicles.forEach(vehicle => {
            const optionVehicle = document.createElement('option');
            optionVehicle.value = vehicle;
            optionVehicle.text = vehicle;
            rodzajPojazduSelect.appendChild(optionVehicle);
        });

        // Listener na zmiany w Level 1
        rodzajPojazduSelect.addEventListener('change', function () {
            const selectedLevel1 = this.value;
            console.log('Wybrany Level 1:', selectedLevel1);
            const filteredLevel1 = vehiclesData.filter(vehicle => vehicle.level1 === selectedLevel1);
            console.log('Dane po przefiltrowaniu Level 1:', filteredLevel1);

            loadNextLevel(2, filteredLevel1, level2Select);
        });

        // Listener na zmiany w Level 2
        level2Select.addEventListener('change', function () {
            const selectedLevel2 = this.value;
            console.log('Wybrany Level 2:', selectedLevel2);
            const filteredLevel2 = vehiclesData.filter(vehicle => vehicle.level2 === selectedLevel2);
            console.log('Dane po przefiltrowaniu Level 2:', filteredLevel2);

            loadNextLevel(3, filteredLevel2, level3Select);
        });

        // Listener na zmiany w Level 3
        level3Select.addEventListener('change', function () {
            const selectedLevel3 = this.value;
            console.log('Wybrany Level 3:', selectedLevel3);
            const filteredLevel3 = vehiclesData.filter(vehicle => vehicle.level3 === selectedLevel3);
            console.log('Dane po przefiltrowaniu Level 3:', filteredLevel3);

            loadFuelTypes(filteredLevel3);
        });

        // Listener na zmiany w Sposób zasilania
        sposobZasilaniaSelect.addEventListener('change', function () {
            const selectedFuel = this.value;
            console.log('Wybrany sposób zasilania:', selectedFuel);
            const filteredFuel = vehiclesData.filter(vehicle => vehicle.column_text === selectedFuel);
            console.log('Dane po przefiltrowaniu sposobu zasilania:', filteredFuel);

            updateUnits(filteredFuel);
        });
    }

// Funkcja do ładowania opcji dla kolejnego poziomu
function loadNextLevel(level, data, targetSelect) {
    targetSelect.innerHTML = '<option></option>'; // Czyścimy poprzednie opcje

    if (level === 2) {
        // Filtrowanie danych dla Level 2 na podstawie danych z Level 1
        const uniqueLevel2 = [...new Set(data.map(vehicle => vehicle.level2))];
        console.log('Dostępne wartości Level 2:', uniqueLevel2);

        uniqueLevel2.forEach(value => {
            if (value) {
                const option = document.createElement('option');
                option.value = value;
                option.text = value;
                targetSelect.appendChild(option);
            }
        });

        // Listener na zmiany w Level 2 - aby kontynuować filtrowanie
        targetSelect.addEventListener('change', function () {
            const selectedLevel2 = this.value;
            console.log('Wybrany Level 2:', selectedLevel2);

            // Filtrujemy dane na podstawie Level 2
            const filteredLevel2 = data.filter(vehicle => vehicle.level2 === selectedLevel2);
            console.log('Dane po przefiltrowaniu Level 2:', filteredLevel2);

            // Kontynuacja procesu ładowania kolejnego poziomu - Level 3
            loadNextLevel(3, filteredLevel2, level3Select);
        });
    } else if (level === 3) {
        // Filtrowanie danych dla Level 3 na podstawie danych z Level 2
        const uniqueLevel3 = [...new Set(data.map(vehicle => vehicle.level3))];
        console.log('Dostępne wartości Level 3:', uniqueLevel3);

        uniqueLevel3.forEach(value => {
            if (value) {
                const option = document.createElement('option');
                option.value = value;
                option.text = value;
                targetSelect.appendChild(option);
            }
        });

        // Dodanie listenera na zmiany w Level 3 i aktualizacja sposobu zasilania
        targetSelect.addEventListener('change', function () {
            const selectedLevel3 = this.value;
            console.log('Wybrany Level 3:', selectedLevel3);

            // Filtrowanie danych po Level 3
            const filteredLevel3 = data.filter(vehicle => vehicle.level3 === selectedLevel3);
            console.log('Dane po przefiltrowaniu Level 3:', filteredLevel3);

            // Ładowanie sposobów zasilania na podstawie przefiltrowanych danych
            loadFuelTypes(filteredLevel3);
        });
    }
}


    // Funkcja do ładowania Sposób zasilania
    function loadFuelTypes(data) {
        const sposobZasilaniaSelect = document.getElementById('sposob_zasilania_modal');
        sposobZasilaniaSelect.innerHTML = '<option></option>';

        const uniqueFuels = [...new Set(data.map(vehicle => vehicle.column_text))];
        uniqueFuels.forEach(fuel => {
            const option = document.createElement('option');
            option.value = fuel;
            option.text = fuel;
            sposobZasilaniaSelect.appendChild(option);
        });
    }

    // Funkcja do aktualizacji jednostek
    function updateUnits(data) {
        const jednostkaSelect = document.getElementById('jednostka_modal');
        jednostkaSelect.innerHTML = '<option></option>';

        const units = [...new Set(data.map(vehicle => vehicle.uom))];
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.text = unit;
            jednostkaSelect.appendChild(option);
        });

        if (units.length === 0) {
            jednostkaSelect.appendChild(new Option('Brak jednostek', ''));
        }
    }

    // Event listener na przycisk "Dodaj pojazd"
    document.getElementById('dodaj_mobilne_btn').addEventListener('click', function () {
        clearMobilneEmisjeForm();
        populateModalOptions();
        modal.show();
    });






// Event listener do usuwania wierszy
mobilneEmisjeTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-vehicle')) {
        const rowToRemove = event.target.closest('tr');
        const rowIndex = Array.from(mobilneEmisjeTableBody.children).indexOf(rowToRemove);

        // Usuwamy element z tablicy obliczeń, jeśli istnieje
        emissionCalculations.splice(rowIndex, 1);
        rowToRemove.remove();

        // Aktualizacja modala z obliczeniami po usunięciu wiersza
        if (emissionCalculations.length > 0) {
            showEmissionCalculationsModal();
        } else {
            const modal = bootstrap.Modal.getInstance(document.getElementById('emissionCalculationsModal'));
            if (modal) modal.hide();
        }
    }
});

// Obsługa przycisku "Edytuj"
mobilneEmisjeTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-vehicle')) {
        editedRow = event.target.closest('tr'); // Pobiera edytowany wiersz

        // Pobieranie wartości z edytowanego wiersza i ustawianie w formularzu
        const liczbaPojazdow = editedRow.cells[0].textContent;
        const rodzajPojazdu = editedRow.cells[1].textContent;
        const level2 = editedRow.cells[2].textContent;
        const level3 = editedRow.cells[3].textContent;
        const sposobZasilania = editedRow.cells[4].textContent;
        const zuzyciePaliwa = editedRow.cells[5].textContent;
        const jednostka = editedRow.cells[6].textContent;

        // Ustawianie wartości w formularzu modala
        document.getElementById('liczba_pojazdow_modal').value = liczbaPojazdow;
        document.getElementById('rodzaj_pojazdu_modal').value = rodzajPojazdu;
        document.getElementById('level2_modal').value = level2;
        document.getElementById('level3_modal').value = level3;
        document.getElementById('sposob_zasilania_modal').value = sposobZasilania;
        document.getElementById('zuzycie_paliwa_modal').value = zuzyciePaliwa;
        document.getElementById('jednostka_modal').value = jednostka;

        // Ustawienie wybranych opcji w formularzu
        setSelectedOption(document.getElementById('rodzaj_pojazdu_modal'), rodzajPojazdu);
        setSelectedOption(document.getElementById('level2_modal'), level2);
        setSelectedOption(document.getElementById('level3_modal'), level3);
        setSelectedOption(document.getElementById('sposob_zasilania_modal'), sposobZasilania);
        setSelectedOption(document.getElementById('jednostka_modal'), jednostka);

        modal.show(); // Otwieranie modala do edycji
        console.log('Otwieram modal do edycji wiersza');
    }
});


// Usuwanie tła modala po jego zamknięciu
$('#emissionCalculationsModal').on('hidden.bs.modal', function () {
    // Usunięcie klasy modal-backdrop, jeśli nadal istnieje
    $('.modal-backdrop').remove();
});


// Funkcja do ustawiania wybranej opcji w select
function setSelectedOption(selectElement, value) {
    const options = Array.from(selectElement.options);
    const matchingOption = options.find(option => option.value === value);
    if (matchingOption) {
        selectElement.value = value; // Ustawienie wybranej opcji
    } else {
        console.warn(`Opcja "${value}" nie istnieje w ${selectElement.id}`);
    }
}




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

// Obliczenia


