async function verifyCertificate() {

    const params =
        new URLSearchParams(window.location.search);

    const certificateId =
        params.get("id");

    const result =
        document.getElementById("result");

    if (!certificateId) {

        result.innerHTML = `
            <h1>Invalid Request</h1>

            <p>
                Certificate ID was not provided.
            </p>
        `;

        return;
    }

    try {

        const response =
            await fetch("certificates.json");

        const certificates =
            await response.json();

        const certificate =
            certificates.find(
                item =>
                item.certificateId === certificateId
            );

        if (certificate) {

            result.innerHTML = `

                <div class="verified-icon">
                    ✓
                </div>

                <h1>Certificate Verified</h1>

                <p>
                    This certificate is authentic.
                </p>

                <div class="certificate-details">

                    <h2>
                        ${certificate.name}
                    </h2>

                    <p>
                        <strong>Team:</strong>
                        ${certificate.team}
                    </p>

                    <p>
                        <strong>Certificate Type:</strong>
                        ${certificate.type}
                    </p>

                    <p>
                        <strong>Domain:</strong>
                        ${certificate.domain}
                    </p>

                    <p>
                        <strong>Certificate ID:</strong>
                        ${certificate.certificateId}
                    </p>

                </div>

                <a
                    href="${certificate.certificate}"
                    target="_blank"
                    class="certificate-button"
                >
                    View Certificate
                </a>

            `;

        } else {

            result.innerHTML = `

                <h1>Certificate Not Found</h1>

                <p>
                    The Certificate ID is invalid.
                </p>

            `;

        }

    } catch (error) {

        result.innerHTML = `

            <h1>Error</h1>

            <p>
                Unable to verify certificate.
            </p>

        `;

    }

}

verifyCertificate();