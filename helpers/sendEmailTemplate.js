const { FRONTEND_URL, BASE_URL } = process.env;

const sendEmailTemplate = (verificationToken) =>
`<table cellpadding="0" cellspacing="0" width="100%" style="font-family: 'Roboto';">
        <tr>
            <td style="padding: 10px;">
                <a href="${FRONTEND_URL}" target="_blank">
                    <img src="https://i.postimg.cc/RV6Smgy1/logo.png" />
                </a>
            </td>
        </tr>
        <tr style="padding: 20px; text-align: center;">
         <td width="100%" height="300px" style="padding-bottom: 50px; 
         border-bottom-left-radius: 70px;  
         background: #F2F5FC;" valign="top">
            <img width="100%" src="https://i.postimg.cc/tJzh4XYf/kapusta.png" />
            <div style="padding: 10px"><h2>Confirm your email address to get started on Kapusta</h2>
            <div style="background-color: #FF751D; border-radius: 16px; 
            width: 150px; 
            padding-top: 15px;
            padding-bottom: 15px; 
            margin: 0 auto;">
                <a target="_blank" href='${BASE_URL}/api/auth/verify/${verificationToken}' style="font-family: 'Roboto';
                font-weight: 700;
                font-size: 14px;
                display: block;
                text-align: center;
                text-transform: uppercase;
                text-decoration: none;
                color: #FFFFFF;">
                Confirm email</a>
            </div>
            <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
            <p>Note: This is an automated response, so please do not reply to this email.</p>
            </div>
         </td>
        </tr>
    </table>`;

    module.exports = sendEmailTemplate;