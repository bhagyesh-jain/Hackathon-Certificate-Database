// ==========================================
// IKIGAI 2026 CERTIFICATE VERIFICATION
// ==========================================


async function verifyCertificate() {

    const loadingState =
        document.getElementById("loadingState");

    const result =
        document.getElementById("result");


    // ======================================
    // READ CERTIFICATE ID FROM URL
    // ======================================

    const params =
        new URLSearchParams(window.location.search);


    const certificateId =
        params.get("id");


    // ======================================
    // INVALID URL
    // ======================================

    if (!certificateId) {

        await delay(900);

        loadingState.style.display = "none";

        showInvalidRequest();

        return;
    }


    try {


        // ==================================
        // LOAD CERTIFICATE DATABASE
        // ==================================

        const response =
            await fetch(
                "certificates.json",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load certificate database."
            );

        }


        const certificates =
            await response.json();



        // ==================================
        // SEARCH FOR CERTIFICATE
        // ==================================

        const certificate =
            certificates.find(

                item =>

                    normalizeCertificateId(
                        item.certificateId
                    )

                    ===

                    normalizeCertificateId(
                        certificateId
                    )

            );



        // ==================================
        // SMALL VERIFICATION DELAY
        // ==================================

        await delay(1300);


        loadingState.style.display = "none";



        // ==================================
        // CERTIFICATE FOUND
        // ==================================

        if (certificate) {

            showVerifiedCertificate(
                certificate
            );

        }


        // ==================================
        // CERTIFICATE NOT FOUND
        // ==================================

        else {

            showCertificateNotFound(
                certificateId
            );

        }


    }


    // ======================================
    // SYSTEM ERROR
    // ======================================

    catch (error) {


        console.error(
            "Certificate verification error:",
            error
        );


        await delay(700);


        loadingState.style.display =
            "none";


        showSystemError();

    }

}



// ==========================================
// VERIFIED CERTIFICATE
// ==========================================


function showVerifiedCertificate(certificate) {


    const result =
        document.getElementById("result");



    // ======================================
    // READ CERTIFICATE DATA
    // ======================================


    const certificateName =
        certificate.name ||
        "Participant";


    const certificateTeam =
        certificate.team ||
        "Individual Participant";


    const certificateType =
        certificate.type ||
        "Participation";


    const certificateDomain =
        certificate.domain ||
        "—";


    const certificateId =
        certificate.certificateId ||
        "—";


    const certificateLink =
        certificate.certificate ||
        "";



    // ======================================
    // GENERATE VERIFIED UI
    // ======================================


    result.innerHTML = `


        <div class="result-card verified-result">


            <!-- ==========================
                 SUCCESS ICON
            =========================== -->


            <div class="success-animation">


                <div class="success-ring">


                    <span>

                        ✓

                    </span>


                </div>


            </div>



            <!-- ==========================
                 VERIFIED BADGE
            =========================== -->


            <div class="verified-badge">


                <span></span>


                AUTHENTIC CERTIFICATE


            </div>



            <!-- ==========================
                 RESULT HEADING
            =========================== -->


            <h1>

                Certificate Verified

            </h1>



            <p class="result-description">

                This certificate has been successfully
                verified against the official IKIGAI 2026
                certificate database.

            </p>



            <!-- ==========================
                 PARTICIPANT
            =========================== -->


            <div class="participant-section">


                <span class="section-label">

                    CERTIFICATE ISSUED TO

                </span>



                <h2>

                    ${escapeHTML(certificateName)}

                </h2>



                <p>

                    ${escapeHTML(certificateTeam)}

                </p>


            </div>



            <!-- ==========================
                 CERTIFICATE INFORMATION
            =========================== -->


            <div class="certificate-information">



                <!-- CERTIFICATE ID -->


                <div class="info-item">


                    <span class="info-label">

                        Certificate ID

                    </span>


                    <strong>

                        ${escapeHTML(certificateId)}

                    </strong>


                </div>



                <!-- CERTIFICATE TYPE -->


                <div class="info-item">


                    <span class="info-label">

                        Certificate Type

                    </span>


                    <strong>

                        ${escapeHTML(certificateType)}

                    </strong>


                </div>



                <!-- TEAM -->


                <div class="info-item">


                    <span class="info-label">

                        Team

                    </span>


                    <strong>

                        ${escapeHTML(certificateTeam)}

                    </strong>


                </div>



                <!-- DOMAIN -->


                <div class="info-item">


                    <span class="info-label">

                        Domain

                    </span>


                    <strong>

                        ${escapeHTML(certificateDomain)}

                    </strong>


                </div>


            </div>



            <!-- ==========================
                 VERIFICATION FOOTER
            =========================== -->


            <div class="verification-footer">



                <!-- DATABASE STATUS -->


                <div class="database-status">


                    <span class="status-dot"></span>


                    <span>

                        Verified in official database

                    </span>


                </div>



                <!-- CERTIFICATE BUTTON -->


                ${generateCertificateButton(
                    certificateLink
                )}


            </div>



            <!-- ==========================
                 VERIFY ANOTHER
            =========================== -->


            <a
                href="index.html"
                class="verify-another"
            >

                ← Verify another certificate

            </a>


        </div>

    `;

}



// ==========================================
// GENERATE CERTIFICATE BUTTON
// ==========================================


function generateCertificateButton(
    certificateLink
) {


    // ======================================
    // CERTIFICATE LINK AVAILABLE
    // ======================================


    if (certificateLink) {


        return `


            <a
                href="${escapeAttribute(
                    certificateLink
                )}"
                target="_blank"
                rel="noopener noreferrer"
                class="view-certificate-button"
            >


                <span>

                    View Certificate

                </span>


                <span aria-hidden="true">

                    ↗

                </span>


            </a>

        `;

    }



    // ======================================
    // CERTIFICATE LINK NOT AVAILABLE
    // ======================================


    return `


        <button
            type="button"
            class="
                view-certificate-button
                disabled-button
            "
            disabled
        >

            Certificate PDF Unavailable

        </button>

    `;

}



// ==========================================
// CERTIFICATE NOT FOUND
// ==========================================


function showCertificateNotFound(
    certificateId
) {


    const result =
        document.getElementById("result");


    result.innerHTML = `


        <div class="result-card error-result">



            <!-- ERROR ICON -->


            <div class="error-icon">


                <span>

                    ×

                </span>


            </div>



            <!-- ERROR BADGE -->


            <div class="invalid-badge">

                VERIFICATION FAILED

            </div>



            <!-- ERROR HEADING -->


            <h1>

                Certificate Not Found

            </h1>



            <!-- ERROR DESCRIPTION -->


            <p class="result-description">

                We couldn't find a certificate matching
                the provided ID in the official
                IKIGAI 2026 certificate database.

            </p>



            <!-- INVALID ID -->


            <div class="invalid-id-box">


                <span>

                    CERTIFICATE ID

                </span>


                <strong>

                    ${escapeHTML(certificateId)}

                </strong>


            </div>



            <!-- RETURN BUTTON -->


            <a
                href="index.html"
                class="return-button"
            >

                Try Another Certificate

            </a>


        </div>

    `;

}



// ==========================================
// INVALID REQUEST
// ==========================================


function showInvalidRequest() {


    const result =
        document.getElementById("result");


    result.innerHTML = `


        <div class="result-card error-result">



            <div class="error-icon">


                <span>

                    !

                </span>


            </div>



            <div class="invalid-badge">

                INVALID REQUEST

            </div>



            <h1>

                Certificate ID Missing

            </h1>



            <p class="result-description">

                No certificate ID was provided in
                the verification request.

            </p>



            <a
                href="index.html"
                class="return-button"
            >

                Return to Verification Portal

            </a>


        </div>

    `;

}



// ==========================================
// SYSTEM ERROR
// ==========================================


function showSystemError() {


    const result =
        document.getElementById("result");


    result.innerHTML = `


        <div class="result-card error-result">



            <div class="error-icon">


                <span>

                    !

                </span>


            </div>



            <div class="invalid-badge">

                SYSTEM ERROR

            </div>



            <h1>

                Verification Unavailable

            </h1>



            <p class="result-description">

                The certificate database could not
                be loaded. Please try again later.

            </p>



            <a
                href="index.html"
                class="return-button"
            >

                Return Home

            </a>


        </div>

    `;

}



// ==========================================
// NORMALIZE CERTIFICATE ID
// ==========================================


function normalizeCertificateId(value) {


    return String(value || "")

        .trim()

        .toUpperCase();

}



// ==========================================
// DELAY UTILITY
// ==========================================


function delay(milliseconds) {


    return new Promise(

        resolve =>

            setTimeout(
                resolve,
                milliseconds
            )

    );

}



// ==========================================
// ESCAPE HTML
// Prevents certificate data from being
// interpreted as HTML
// ==========================================


function escapeHTML(value) {


    const element =
        document.createElement("div");


    element.textContent =
        String(value ?? "");


    return element.innerHTML;

}



// ==========================================
// ESCAPE HTML ATTRIBUTE
// Used for certificate URLs
// ==========================================


function escapeAttribute(value) {


    return String(value ?? "")

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        );

}



// ==========================================
// START CERTIFICATE VERIFICATION
// ==========================================


verifyCertificate();