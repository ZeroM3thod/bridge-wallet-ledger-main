import { useState } from "react"
import Icon from "@/components/app/Icon"
import { AppLink } from "@/components/app/AppLink"
import { teamRates, teamData, levelTotals } from "@/lib/app-data"
import { bengaliNumber, money } from "@/lib/app-format"
export default function TeamMembersPage() {
 const [level, setLevel] = useState<keyof typeof teamRates>(1)
 const data = teamData[level]; const totals = levelTotals(level)
 return <main className="team-page page-content"><AppLink page="team" className="sub-back">← সদস্য ও কমিশন</AppLink>
      <section className="team-levels">
        <h2>
          <i /> সদস্য ও কমিশন
        </h2>
        <div className="level-tabs">
          {([1, 2, 3] as const).map((item) => (
            <button
              className={level === item ? "active" : ""}
              key={item}
              onClick={() => setLevel(item)}
            >
              লেভেল {bengaliNumber(item)}
              <span>({bengaliNumber(teamRates[item])}%)</span>
            </button>
          ))}
        </div>

        <div className="level-stats team-card">
          <div className="level-stats-head">
            <div>
              <small>
                {data.title} ({bengaliNumber(teamRates[level])}% কমিশন)
              </small>
              <strong>
                সদস্য: {bengaliNumber(data.members)} জন{" "}
                <em>({bengaliNumber(data.active)} জন সক্রিয়)</em>
              </strong>
            </div>
            <div>
              <small>এই লেভেলের আয়</small>
              <strong>{money(totals.total)}</strong>
            </div>
          </div>
          <div className="level-income">
            <div>
              <small>
                <Icon name="wallet" size={13} /> ডিপোজিট বোনাস
              </small>
              <strong>{money(totals.deposit)}</strong>
            </div>
            <div>
              <small>
                <Icon name="chart" size={13} /> প্রফিট কমিশন
              </small>
              <strong>{money(totals.profit)}</strong>
            </div>
          </div>
        </div>

        <div className="referral-list">
          {data.list.map((member) => {
            const bonus = (member.deposit * teamRates[level]) / 100
            const commission = (member.profit * teamRates[level]) / 100
            return (
              <article className="referral-member" key={member.id ?? member.mobile}>
                <header className="referral-member-header">
                  <div className="referral-mobile">
                    <span className="referral-avatar"><Icon name="user" size={18} /></span>
                    <div><span className="referral-label">মোবাইল নম্বর</span><strong>{member.mobile}</strong></div>
                  </div>
                  <span className={`referral-status ${member.active ? "is-active" : ""}`}>
                    <i />{member.active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </span>
                </header>
                <dl className="referral-details">
                  <div><dt>সদস্য আইডি</dt><dd>{member.id ?? "তথ্য নেই"}</dd></div>
                  <div><dt>ভিআইপি নম্বর</dt><dd>{member.vipLevel === undefined ? "তথ্য নেই" : `VIP ${bengaliNumber(member.vipLevel)}`}</dd></div>
                  <div><dt>মোট ডিপোজিট</dt><dd>{money(member.deposit)}</dd></div>
                  <div className="referral-earned"><dt>মোট কমিশন</dt><dd>{money(bonus + commission)}</dd></div>
                </dl>
                <footer className="referral-member-footer">
                  <span>ডিপোজিট বোনাস <b>{money(bonus)}</b></span>
                  <span>প্রফিট কমিশন <b>{money(commission)}</b></span>
                  <span className="referral-joined">যোগদান: {member.date}</span>
                </footer>
              </article>
            )
          })}
        </div>
      </section>

      <section className="commission-rules">
        <h2>
          <Icon name="gift" size={17} /> কমিশন হিসাব
        </h2>
        {[
          ["wallet", "ডিপোজিট বোনাস", "বোনাস"],
          ["chart", "দৈনিক কমিশন", "কমিশন"],
        ].map(([icon, title, label]) => (
          <div className="rule-group" key={title}>
            <h3>
              <Icon name={icon ?? ""} size={14} /> {title}
            </h3>
            <div>
              {([1, 2, 3] as const).map((item) => (
                <article key={item}>
                  <strong>
                    {bengaliNumber(teamRates[item])}% {label}
                  </strong>
                  <small>{bengaliNumber(item)}ম লেভেল</small>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
</main>
}
