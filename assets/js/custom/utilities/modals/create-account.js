"use strict";
var KTCreateAccount = function() {
    var e, t, i, o, a, r, s = [];

    function initRepeater() {
        console.log("Initializing repeater and validation");

        // Add a delay to ensure the form element is available
        setTimeout(function() {
            const form = document.getElementById("kt_docs_repeater_form");

            if (form) {
                console.log("Form element found for repeater initialization");

                // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
                var validator = FormValidation.formValidation(
                    form,
                    {
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: ""
                            }),
                            excluded: new FormValidation.plugins.Excluded({
                                excluded: function (field, ele, eles) {
                                    if (form.querySelector('[name="' + field + '"]') === null) {
                                        return true;
                                    }
                                },
                            }),
                        }
                    }
                );

                const addFields = function(index) {
                    console.log("Adding fields for index:", index);
                    const namePrefix = "data[" + index + "]";

                    // Add validators
                    validator.addField(namePrefix + "[select2_input]", {
                        validators: {
                            notEmpty: {
                                message: "Select2 input is required"
                            }
                        }
                    });

                    validator.addField(namePrefix + "[email]", {
                        validators: {
                            emailAddress: {
                                message: "The value is not a valid email address"
                            },
                            notEmpty: {
                                message: "Email address is required"
                            }
                        }
                    });

                    validator.addField(namePrefix + "[primary][]", {
                        validators: {
                            notEmpty: {
                                message: "Required"
                            }
                        }
                    });

                    // Initialize Select2
                    $('[name="' + namePrefix + '[select2_input]"]').select2({
                        placeholder: 'Select an option',
                        width: '100%'
                    }).on('change', function () {
                        validator.revalidateField(namePrefix + '[select2_input]');
                    });
                };

                const removeFields = function(index) {
                    console.log("Removing fields for index:", index);
                    const namePrefix = "data[" + index + "]";

                    validator.removeField(namePrefix + "[select2_input]");
                    validator.removeField(namePrefix + "[email]");
                    validator.removeField(namePrefix + "[primary][]");
                }

                $(form).repeater({
                    initEmpty: false,

                    show: function () {
                        console.log("Show function called");
                        $(this).slideDown();

                        const index = $(this).closest("[data-repeater-item]").index();
                        console.log("Item added at index:", index);

                        addFields(index);
                    },

                    hide: function (deleteElement) {
                        console.log("Hide function called");
                        $(this).slideUp(deleteElement);
                    }
                });

                // Initial fields
                addFields(0);

                // Submit button handler
                const submitButton = document.getElementById("kt_docs_repeater_button");
                submitButton.addEventListener("click", function (e) {
                    // Prevent default button action
                    e.preventDefault();
                    console.log("Submit button clicked");

                    // Validate form before submit
                    if (validator) {
                        validator.validate().then(function (status) {
                            if (status == "Valid") {
                                console.log("Form is valid");
                                // Show loading indication
                                submitButton.setAttribute("data-kt-indicator", "on");

                                // Disable button to avoid multiple click
                                submitButton.disabled = true;

                                // Simulate form submission. For more info check the plugin's official documentation:https://sweetalert2.github.io/
                                setTimeout(function () {
                                    // Remove loading indication
                                    submitButton.removeAttribute("data-kt-indicator");

                                    // Enable button
                                    submitButton.disabled = false;

                                    // Show popup confirmation
                                    Swal.fire({
                                        text: "Form has been successfully submitted!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });

                                    //form.submit(); // Submit form
                                }, 2000);
                            } else {
                                console.log("Form is invalid");
                            }
                        });
                    }
                });
            } else {
                console.log("Form element not found");
            }
        }, 500); // Add delay of 500ms to ensure the form is loaded
    }

    return {
        init: function() {
            console.log("Initializing KTCreateAccount...");
            (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e),
            (t = document.querySelector("#kt_create_account_stepper")) &&
            (i = t.querySelector("#kt_create_account_form"),
            o = t.querySelector('[data-kt-stepper-action="submit"]'),
            a = t.querySelector('[data-kt-stepper-action="next"]'),
            (r = new KTStepper(t)).on("kt.stepper.changed", function(e) {
                console.log("Step changed to: " + r.getCurrentStepIndex());

                if (r.getCurrentStepIndex() === 2) { // Step 2
                    console.log("Initializing repeater and validation for step 2...");
                    initRepeater(); // Initialize the repeater when we are on step 2
                }

                if (r.getCurrentStepIndex() === 4) {
                    o.classList.remove("d-none");
                    o.classList.add("d-inline-block");
                    a.classList.add("d-none");
                } else if (r.getCurrentStepIndex() === 5) {
                    o.classList.add("d-none");
                    a.classList.add("d-none");
                } else {
                    o.classList.remove("d-inline-block");
                    o.classList.remove("d-none");
                    a.classList.remove("d-none");
                }
            }),
            r.on("kt.stepper.next", function(e) {
                console.log("Going to the next step...");
                var currentStepIndex = e.getCurrentStepIndex();
                console.log("Current step index: " + currentStepIndex);
                var t = s[currentStepIndex - 1];
                console.log("Validation object for current step: ", t);
                if (t) {
                    console.log("Current value of business_type before validation: ", i.querySelector('[name="business_type"]').value);
                    t.validate().then(function(t) {
                        console.log("Validation result: " + t);
                        if ("Valid" == t) {
                            e.goNext();
                            KTUtil.scrollTop();
                        } else {
                            Swal.fire({
                                text: "Przepraszamy, wygląda na to, że wykryto pewne błędy na formularzu, proszę przejrzeć wymagane pola i spróbować ponownie.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, rozumiem!",
                                customClass: {
                                    confirmButton: "btn btn-light"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
                        }
                    });
                } else {
                    e.goNext();
                    KTUtil.scrollTop();
                }
            }),
            r.on("kt.stepper.previous", function(e) {
                console.log("Going to the previous step...");
                e.goPrevious();
                KTUtil.scrollTop();
            }),
            s.push(FormValidation.formValidation(i, {
                fields: {
                    business_name: {
                        validators: {
                            notEmpty: {
                                message: "Nazwa firmy jest wymagana"
                            }
                        }
                    },
                    nip_regon: {
                        validators: {
                            notEmpty: {
                                message: "NIP/REGON firmy jest wymagany"
                            }
                        }
                    },
                    business_type: {
                        validators: {
                            notEmpty: {
                                message: "Branża jest wymagana"
                            }
                        }
                    },
                    reporting_period: {
                        validators: {
                            notEmpty: {
                                message: "Okres raportowania jest wymagany"
                            }
                        }
                    },
                    employee_count: {
                        validators: {
                            notEmpty: {
                                message: "Liczba pracowników jest wymagana"
                            }
                        }
                    },
                    annual_revenue: {
                        validators: {
                            notEmpty: {
                                message: "Roczny obrót jest wymagany"
                            }
                        }
                    },
                    usable_area: {
                        validators: {
                            notEmpty: {
                                message: "Powierzchnia użytkowa jest wymagana"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            s.push(FormValidation.formValidation(i, {
                fields: {
                    account_team_size: {
                        validators: {
                            notEmpty: {
                                message: "Time size is required"
                            }
                        }
                    },
                    account_name: {
                        validators: {
                            notEmpty: {
                                message: "Account name is required"
                            }
                        }
                    },
                    account_plan: {
                        validators: {
                            notEmpty: {
                                message: "Account plan is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            s.push(FormValidation.formValidation(i, {
                fields: {
                    card_name: {
                        validators: {
                            notEmpty: {
                                message: "Name on card is required"
                            }
                        }
                    },
                    card_number: {
                        validators: {
                            notEmpty: {
                                message: "Card number is required"
                            },
                            creditCard: {
                                message: "Card number is not valid"
                            }
                        }
                    },
                    card_expiry_month: {
                        validators: {
                            notEmpty: {
                                message: "Month is required"
                            }
                        }
                    },
                    card_expiry_year: {
                        validators: {
                            notEmpty: {
                                message: "Year is required"
                            }
                        }
                    },
                    card_cvv: {
                        validators: {
                            notEmpty: {
                                message: "CVV is required"
                            },
                            digits: {
                                message: "CVV must contain only digits"
                            },
                            stringLength: {
                                min: 3,
                                max: 4,
                                message: "CVV must contain 3 to 4 digits only"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            o.addEventListener("click", function(e) {
                console.log("Submit button clicked...");
                s[0].validate().then(function(t) {
                    console.log("Submit validation result: " + t);
                    if ("Valid" == t) {
                        e.preventDefault();
                        o.disabled = !0;
                        o.setAttribute("data-kt-indicator", "on");
                        setTimeout(function() {
                            o.removeAttribute("data-kt-indicator");
                            o.disabled = !1;
                            r.goNext();
                        }, 2000);
                    } else {
                        Swal.fire({
                            text: "Przepraszamy, wygląda na to, że wykryto pewne błędy na formularzu, proszę przejrzeć wymagane pola i spróbować ponownie.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, rozumiem!",
                            customClass: {
                                confirmButton: "btn btn-light"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }),
            $(i.querySelector('[name="card_expiry_month"]')).on("change", function() {
                console.log("card_expiry_month changed");
                s[3].revalidateField("card_expiry_month");
            }),
            $(i.querySelector('[name="card_expiry_year"]')).on("change", function() {
                console.log("card_expiry_year changed");
                s[3].revalidateField("card_expiry_year");
            }),
            $(i.querySelector('[name="business_type"]')).on("change", function() {
                console.log("business_type changed");
                console.log("Current value of business_type: ", $(this).val());
                s[0].revalidateField("business_type");
            }),
            $(i.querySelector('[name="reporting_period"]')).on("change", function() {
                console.log("reporting_period changed");
                s[0].revalidateField("reporting_period");
            }),
            $(i.querySelector('[name="employee_count"]')).on("input", function() {
                console.log("employee_count changed");
                s[0].revalidateField("employee_count");
            }),
            $(i.querySelector('[name="annual_revenue"]')).on("input", function() {
                console.log("annual_revenue changed");
                s[0].revalidateField("annual_revenue");
            }),
            $(i.querySelector('[name="usable_area"]')).on("input", function() {
                console.log("usable_area changed");
                s[0].revalidateField("usable_area");
            }),
            $(i.querySelector('[name="business_name"]')).on("input", function() {
                console.log("business_name changed");
                s[0].revalidateField("business_name");
            }),
            $(i.querySelector('[name="nip_regon"]')).on("input", function() {
                console.log("nip_regon changed");
                s[0].revalidateField("nip_regon");
            }));
        }
    }
}();
KTUtil.onDOMContentLoaded(function() {
    KTCreateAccount.init();
});
