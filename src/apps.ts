import type { IconName } from './icons'

export type AppId = 'invitation' | 'schedule' | 'contact' | 'note'

export interface AppDefinition {
  id: AppId
  label: string
  title: string
  icon: IconName
  width: number
  status: string
  content: string
}

export const apps: readonly AppDefinition[] = [
  {
    id: 'invitation',
    label: 'invitation',
    title: 'invitation.exe',
    icon: 'invitation',
    width: 560,
    status: 'invitation',
    content: `
      <div class="app-intro">
        <h1>You're invited<span class="accent">!</span></h1>
        <p class="app-lead">Lê Bùi Trung Dũng đã tốt nghiệp HCMUT ròi</p>
      </div>

      <fieldset class="app-section">
        <legend>Message</legend>
        <p>chuyện là sau 4 năm vật lộn với BK thì toi cuối cùng cũng được tốt nghiệp</p>
        <p>nên là tui muốn mời những người quan trọng tới lễ tốt nghiệp, chung vui với chụp với tui một bức hình làm kỉ niệm nha</p>
      </fieldset>

      <p class="app-signature">xin cảm ơn, <strong>Dũng</strong></p>

      <div class="app-actions">
        <button class="default" type="button" data-open-app="schedule">time</button>
        <button type="button" data-open-app="contact">call me</button>
      </div>
    `,
  },
  {
    id: 'schedule',
    label: 'time',
    title: 'time.exe',
    icon: 'schedule',
    width: 580,
    status: 'event',
    content: `
      <div class="app-intro">
        <h2>When &amp; where<span class="accent">?</span></h2>
      </div>

      <div class="sunken-panel app-table-wrap">
        <table class="app-table">
          <thead>
            <tr><th scope="col">chú ý</th><th scope="col">Thông tin</th></tr>
          </thead>
          <tbody>
            <tr><td>Ngày</td><td><span >2026/11/28</span></td></tr>
            <tr><td>Thời gian</td><td><span>16:30</span></td></tr>
            <tr><td>Địa điểm</td><td><span >Trường đại học Bách Khoa Hồ Chí Minh - Cơ sở 1</span></td></tr>
            <tr><td>Địa chỉ</td><td><span >268 Đ. Lý Thường Kiệt, Diên Hồng, Hồ Chí Minh</span></td></tr>
          </tbody>
        </table>
      </div>

      <fieldset class="app-section">
        <legend>note</legend>
        <p>nếu mọi người đi dự được thì nên đi xe bus nha, chỗ đậu xe có thể bị full. Mọi người để xe ở cổng 2, nằm trên đường Tô Hiến Thành nha</p>
      </fieldset>

      <div class="app-actions">
        <a class="win-button default" href="https://maps.app.goo.gl/WMMw618Rndof3C9h7" target="_blank" rel="noreferrer">map</a>
        <button type="button" data-open-app="contact">call me</button>
      </div>
    `,
  },
  {
    id: 'contact',
    label: 'contact',
    title: 'contacts.exe',
    icon: 'contact',
    width: 560,
    status: 'contact',
    content: `
      <div class="app-intro">
        <h2>Need anything<span class="accent">?</span></h2>
        <p class="app-copy">liên hệ toi để biết thêm thông tin nha</p>
      </div>

      <div class="sunken-panel app-table-wrap">
        <table class="app-table">
          <thead>
            <tr><th scope="col">channel</th><th scope="col">content</th></tr>
          </thead>
          <tbody>
            <tr><td>email</td><td><a href="mailto:dung.le.bui.trung@gmail.com">dung.le.bui.trung@gmail.com</a></td></tr>
            <tr><td>facebook</td><td><a href="https://facebook.com/trungdung1711" target="_blank" rel="noreferrer">trungdung1711</a></td></tr>
            <tr><td>zalo</td><td><a href="https://chat.zalo.me">0846979772</a></td></tr>
          </tbody>
        </table>
      </div>
    `,
  },
  {
    id: 'note',
    label: 'note',
    title: 'note.exe',
    icon: 'note',
    width: 540,
    status: 'note',
    content: `
      <div class="app-intro">
        <h2>Before you go<span class="accent">...</span></h2>
      </div>

      <div class="sunken-panel app-note">
        <p class="app-note-heading">✦ note</p>
        <ul>
          <li><span">xin cảm ơn mọi người đã dành chút thời gian tới dự</span></li>
          <li><span">lúc đó sẽ đông người lắm, nên tới gọi cho tui nha</span></li>
          <li><span">dự báo thời tiết 60% mưa, nhớ mang áo mưa</span></li>
          <li><span">không cần mua hoa hay quà gì đâu</span></li>
          <li><span">không cần mua hoa hay quà gì đâu</span></li>
          <li><span">không cần mua hoa hay quà gì đâu</span></li>
        </ul>
        <p class="app-note-end"><span>cảm ơn mọi người nhiều</span></p>
      </div>
    `,
  },
]

export function getApp(id: string): AppDefinition | undefined {
  return apps.find((app) => app.id === id)
}
