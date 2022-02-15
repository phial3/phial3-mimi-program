// index.js
const app = getApp();
Page({
  data: {

  },
  onShow() {
    this.voiceInvitation = wx.createInnerAudioContext();
    this.voiceInvitation.src = "/audio/wx_voice_invitation.mp3";
    this.voiceInvitation.loop = true;
    this.voiceInvitation.play();
    app.globalData.happyNewYaer?.destroy();
    app.globalData.happyNewYaer = null;
  },
  onHide() {
    this.voiceInvitation.destroy();
  },
  handleRefuse() {
    wx.exitMiniProgram({
      success: () => {
        console.log('exit');
      }
    });
  },
  handleAnswer() {
    wx.navigateTo({
      url: '/pages/lucky-turntable/lucky-turntable',
    });
  }
})