export type TabId = 'invitation' | 'schedule' | 'contact' | 'note'

export interface Tab {
  id: TabId
  label: string
  icon: string
}

export const tabs: readonly Tab[] = [
  { id: 'invitation', label: 'Lời mời', icon: '✉' },
  { id: 'schedule', label: 'Thời gian', icon: '◷' },
  { id: 'contact', label: 'Liên hệ', icon: '♡' },
  { id: 'note', label: 'Note', icon: '✎' },
]

export const content: Record<TabId, string> = {
  invitation: `
    <p class="eyebrow">A LITTLE CELEBRATION OF A BIG MILESTONE</p>
    <div class="hero-icon" aria-hidden="true">🎓</div>
    <h1>You're invited<span class="accent">!</span></h1>
    <p class="lead">Tui tốt nghiệp rồi nè!</p>
    <p class="body-copy">Một hành trình dài với thật nhiều kỷ niệm cuối cùng cũng đi đến một cột mốc đáng nhớ. Tui rất vui nếu bạn có thể đến chung vui và lưu lại khoảnh khắc này cùng tui.</p>
    <div class="signature">with love, <strong>[Tên của bạn]</strong> <span>♡</span></div>
  `,
  schedule: `
    <p class="eyebrow">SAVE THE DATE</p>
    <h2>When & where<span class="accent">?</span></h2>
    <div class="info-grid">
      <article class="info-card"><span class="info-icon">▦</span><small>NGÀY</small><strong>[Thứ, ngày tháng năm]</strong><p>Ví dụ: Thứ Bảy, 20/12/2026</p></article>
      <article class="info-card"><span class="info-icon">◷</span><small>THỜI GIAN</small><strong>[Giờ bắt đầu]</strong><p>Vui lòng đến sớm một chút nhé!</p></article>
      <article class="info-card wide"><span class="info-icon">⌖</span><small>ĐỊA ĐIỂM</small><strong>[Tên trường / địa điểm]</strong><p>[Địa chỉ cụ thể]</p><a class="text-link" href="https://maps.google.com/" target="_blank" rel="noreferrer">Mở Google Maps ↗</a></article>
    </div>
  `,
  contact: `
    <p class="eyebrow">SAY HELLO</p>
    <h2>Need anything<span class="accent">?</span></h2>
    <p class="body-copy">Nếu cần hỏi thêm thông tin hoặc muốn báo tui biết bạn sẽ đến, cứ liên hệ qua những kênh bên dưới nha.</p>
    <div class="contact-list">
      <a href="mailto:your-email@example.com"><span>✉</span><div><small>EMAIL</small><strong>your-email@example.com</strong></div><b>↗</b></a>
      <a href="https://instagram.com/" target="_blank" rel="noreferrer"><span>◎</span><div><small>INSTAGRAM</small><strong>@your_username</strong></div><b>↗</b></a>
      <a href="https://facebook.com/" target="_blank" rel="noreferrer"><span>f</span><div><small>FACEBOOK</small><strong>Your Name</strong></div><b>↗</b></a>
    </div>
  `,
  note: `
    <p class="eyebrow">A TINY NOTE</p>
    <h2>Before you go<span class="accent">...</span></h2>
    <div class="note-paper">
      <p>✦ Một vài điều nho nhỏ</p>
      <ul>
        <li>[Dress code nếu có]</li>
        <li>[Lưu ý về thời gian / check-in]</li>
        <li>[Có thể dẫn theo người thân hay không]</li>
      </ul>
      <p class="note-end">Cảm ơn vì đã là một phần trong hành trình của tui. Hẹn gặp bạn! ♡</p>
    </div>
  `,
}
