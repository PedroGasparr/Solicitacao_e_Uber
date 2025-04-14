const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNewRequestNotification = functions.database
  .ref('/solicitacoes_uber/{requestId}')
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.val();
    
    if (requestData.status && requestData.status !== 'pendente') {
      return null;
    }

    // Obter todos os tokens FCM
    const tokensSnapshot = await admin.database().ref('fcm_tokens').once('value');
    const tokens = Object.keys(tokensSnapshot.val() || {});
    
    if (tokens.length === 0) return null;

    // Configurar a notificação
    const message = {
      notification: {
        title: 'Nova Solicitação de Voucher',
        body: `${requestData.nomeCompleto || 'Novo usuário'} solicitou um voucher`
      },
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        screen: 'solicitacoes'
      },
      tokens: tokens
    };

    try {
      await admin.messaging().sendMulticast(message);
      return null;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return null;
    }
  });