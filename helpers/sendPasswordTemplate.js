const { FRONTEND_URL } = process.env;

const sendPasswordTemplate = (newPassword) =>
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
            <div style="padding: 10px"><p style="font-size: 20px;">Your new password: <b>${newPassword}</b></p>
            <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
            <p>Note: This is an automated response, so please do not reply to this email.</p>
            </div>
         </td>
        </tr>
    </table>`;

    module.exports = sendPasswordTemplate;