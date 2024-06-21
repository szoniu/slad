"use strict";
var KTCreateAccount = function() {
    var e, t, i, o, a, r, s = [];
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
