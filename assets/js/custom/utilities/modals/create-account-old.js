"use strict";
var KTCreateAccount = function () {
    var e, t, i, o, a, r, s = [];
    return {
        init: function () {
            (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e), (t = document.querySelector("#kt_create_account_stepper")) && (i = t.querySelector("#kt_create_account_form"), o = t.querySelector('[data-kt-stepper-action="submit"]'), a = t.querySelector('[data-kt-stepper-action="next"]'), (r = new KTStepper(t)).on("kt.stepper.changed", (function (e) {
                4 === r.getCurrentStepIndex() ? (o.classList.remove("d-none"), o.classList.add("d-inline-block"), a.classList.add("d-none")) : 5 === r.getCurrentStepIndex() ? (o.classList.add("d-none"), a.classList.add("d-none")) : (o.classList.remove("d-inline-block"), o.classList.remove("d-none"), a.classList.remove("d-none"))
            })), r.on("kt.stepper.next", (function (e) {
                console.log("stepper.next");
                var t = s[e.getCurrentStepIndex() - 1];
                t ? t.validate().then((function (t) {
                    console.log("validated!"), "Valid" == t ? (e.goNext(), KTUtil.scrollTop()) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function () {
                        KTUtil.scrollTop()
                    }))
                })) : (e.goNext(), KTUtil.scrollTop())
            })), r.on("kt.stepper.previous", (function (e) {
                console.log("stepper.previous"), e.goPrevious(), KTUtil.scrollTop()
            })), s.push(FormValidation.formValidation(i, {
                fields: {
                    account_type: {
                        validators: {
                            notEmpty: {
                                message: "Account type is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), s.push(FormValidation.formValidation(i, {
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
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), s.push(FormValidation.formValidation(i, {
                fields: {
                    business_name: {
                        validators: {
                            notEmpty: {
                                message: "Busines name is required"
                            }
                        }
                    },
                    business_descriptor: {
                        validators: {
                            notEmpty: {
                                message: "Busines descriptor is required"
                            }
                        }
                    },
                    business_type: {
                        validators: {
                            notEmpty: {
                                message: "Busines type is required"
                            }
                        }
                    },
                    business_email: {
                        validators: {
                            notEmpty: {
                                message: "Busines email is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), s.push(FormValidation.formValidation(i, {
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
                                message: "Card member is required"
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
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), o.addEventListener("click", (function (e) {
                s[3].validate().then((function (t) {
                    console.log("validated!"), "Valid" == t ? (e.preventDefault(), o.disabled = !0, o.setAttribute("data-kt-indicator", "on"), setTimeout((function () {
                        o.removeAttribute("data-kt-indicator"), o.disabled = !1, r.goNext()
                    }), 2e3)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function () {
                        KTUtil.scrollTop()
                    }))
                }))
            })), $(i.querySelector('[name="card_expiry_month"]')).on("change", (function () {
                s[3].revalidateField("card_expiry_month")
            })), $(i.querySelector('[name="card_expiry_year"]')).on("change", (function () {
                s[3].revalidateField("card_expiry_year")
            })), $(i.querySelector('[name="business_type"]')).on("change", (function () {
                s[2].revalidateField("business_type")
            })))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTCreateAccount.init()
}));
function initValidator() {
    // Define form element
    const form = document.getElementById("kt_docs_repeater_form");

    // Init form validation rules
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
        const namePrefix = "data[" + index + "]";

        // Add validators
        validator.addField(namePrefix + "[name]", {
            validators: {
                notEmpty: {
                    message: "Text input is required"
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
    };

    const removeFields = function(index) {
        const namePrefix = "data[" + index + "]";

        validator.removeField(namePrefix + "[name]");
        validator.removeField(namePrefix + "[email]");
        validator.removeField(namePrefix + "[primary][]");
    }

    $(form).repeater({
        initEmpty: false,

        show: function () {
            $(this).slideDown();

            const index = $(this).closest("[data-repeater-item]").index();

            addFields(index);
        },

        hide: function (deleteElement) {
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

        // Validate form before submit
        if (validator) {
            validator.validate().then(function (status) {
                if (status == "Valid") {
                    // Show loading indication
                    submitButton.setAttribute("data-kt-indicator", "on");

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
                }
            });
        }
    });
}

// Call the init function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    KTCreateAccount.init();
    initValidator();
});

// Define form element
const form = document.getElementById("kt_docs_repeater_form");

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
    const namePrefix = "data[" + index + "]";

    // Add validators
    validator.addField(namePrefix + "[name]", {
        validators: {
            notEmpty: {
                message: "Text input is required"
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
};

const removeFields = function(index) {
    const namePrefix = "data[" + index + "]";

    validator.addField(namePrefix + "[name]");
    validator.addField(namePrefix + "[email]");
    validator.addField(namePrefix + "[primary][]");
}

$(form).repeater({
    initEmpty: false,

    show: function () {
        $(this).slideDown();

        const index = $(this).closest("[data-repeater-item]").index();

        addFields(index);
    },

    hide: function (deleteElement) {
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

    // Validate form before submit
    if (validator) {
        validator.validate().then(function (status) {
            if (status == "Valid") {
                // Show loading indication
                submitButton.setAttribute("data-kt-indicator", "on");

                // Disable button to avoid multiple click
                submitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
            }
        });
    }
});