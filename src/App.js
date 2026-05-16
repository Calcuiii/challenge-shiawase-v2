import { useState, useEffect } from "react";

const H={
  "2026-05-26":{n:"Cuti Bersama Idul Adha",s:"Cuti Idul Adha",t:"ida"},
  "2026-05-27":{n:"Hari Raya Idul Adha 1447 H",s:"Idul Adha 1447 H",t:"ida"},
  "2026-05-28":{n:"Cuti Bersama Idul Adha",s:"Cuti Bersama",t:"ida"},
  "2026-05-29":{n:"Cuti Bersama Idul Adha",s:"Cuti Bersama",t:"ida"},
  "2026-05-30":{n:"Cuti Bersama Idul Adha",s:"Cuti Bersama",t:"ida"},
  "2026-05-31":{n:"Cuti Bersama Idul Adha",s:"Cuti Bersama",t:"ida"},
  "2026-06-01":{n:"Cuti Bersama Idul Adha",s:"Cuti Idul Adha",t:"ida"},
  "2026-06-17":{n:"Tahun Baru Islam 1448 H",s:"Tahun Baru Islam",t:"isl"},
  "2026-08-17":{n:"HUT RI ke-81",s:"HUT RI ke-81",t:"nas"},
  "2026-09-25":{n:"Maulid Nabi Muhammad SAW",s:"Maulid Nabi",t:"isl"},
};
const HC={ida:"#D4A843",isl:"#7C3AED",nas:"#DC2626"};
const HE={ida:"🕌",isl:"☪️",nas:"🇮🇩"};

const SCHED_WD=[
  {time:"06:00",e:"🌅",label:"Bangun & Persiapan",type:"prep",tip:null},
  {time:"06:30",e:"🏃",label:"Jogging 30 mnt (min. 3km)",type:"sport",tip:"Target kecepatan konsisten. Catat jarak di HP — rekam progres tiap hari!"},
  {time:"07:00",e:"🚿",label:"Mandi & Sarapan",type:"meal",tip:"Sarapan masakannya sini (nasi+tempe/sayur) — makan sampai kenyang, ini energi belajar!"},
  {time:"08:15",e:"📋",label:"Apel / Chore 朝礼",type:"school",tip:"Tepat waktu & penuh semangat. Disiplin apel = karakter diklat!"},
  {time:"09:00",e:"⏳",label:"Jeda — menunggu sensei",type:"jeda",tip:"💡 Waktu emas! Buka Bunpou quiz kosakata atau review 1 topik LevelUpID sekarang."},
  {time:"10:30",e:"📖",label:"Kelas Pagi 授業",type:"class",tip:"Aktif bertanya, catat vocab & grammar baru. Jangan ragu angkat tangan!"},
  {time:"12:00",e:"🍱",label:"Istirahat Makan Siang",type:"meal",tip:"Makan dulu, baru review catatan pagi 10 mnt. Jangan skip makan!"},
  {time:"13:00",e:"📖",label:"Kelas Sore (incl. jeda 30 mnt)",type:"class",tip:"Kalau mengantuk: tegakkan posisi, minum air, fokus pada contoh kalimat sensei."},
  {time:"15:00",e:"⚡",label:"Kegiatan After-Class",type:"activity",tip:null},
  {time:"16:30",e:"🆓",label:"Waktu Bebas",type:"free",tip:"Manfaatkan untuk self-study LevelUpID atau latihan kanji 15 mnt."},
  {time:"19:00",e:"📝",label:"Benkyoukai 勉強会",type:"study",tip:"Hadir penuh & fokus. Catat hal yang belum dipahami — tanyakan esok ke sensei."},
  {time:"20:00",e:"🌙",label:"Bebas — belajar mandiri / istirahat",type:"free",tip:"Opsional: Bunpou quiz ringan atau review catatan. Dengerin kondisi tubuh!"},
];

const SCHED_WE=[
  {time:"",e:"😴",label:"Bangun santai — tidak ada alarm!",type:"free",tip:null},
  {time:"",e:"🏃",label:"(Opsional) Jogging santai",type:"sport",tip:"Kalau mood, tetap jogging santai untuk jaga kebugaran!"},
  {time:"",e:"🍳",label:"Sarapan seru",type:"meal",tip:null},
  {time:"",e:"🎮",label:"Refreshing & waktu bebas penuh",type:"free",tip:"Jalan-jalan, nonton, hangout — ini waktu recharge-mu!"},
  {time:"",e:"🌿",label:"Wisata / outing / eksplorasi",type:"free",tip:"Coba eksplorasi sekitar — pengalaman baru bantu perkaya kosakata Jepang juga!"},
  {time:"",e:"📚",label:"(Opsional) Review santai 30 mnt",type:"study",tip:"Bunpou quiz 1 sesi atau baca LevelUpID — jangan break total dari belajar!"},
  {time:"",e:"😌",label:"Istirahat berkualitas",type:"free",tip:null},
];

const DAY_ACT={
  1:{e:"💬",label:"Kaiwa Renshuu 会話練習 (Senin)",sub:"Latihan percakapan dengan sensei — siapkan vocab dari kelas pagi, berani bicara!"},
  2:{e:"💬",label:"Kaiwa Renshuu 会話練習 (Selasa)",sub:"Latihan percakapan dengan sensei — coba inisiasi topik sendiri, jangan tunggu ditanya!"},
  3:{e:"🏋️",label:"Undoushimasu 運動します (Rabu)",sub:"Kegiatan olahraga bersama — semangat & nikmati, ini juga bagian dari challenge-mu!"},
  4:{e:"🏋️",label:"Undoushimasu 運動します (Kamis)",sub:"Kegiatan olahraga bersama — gerak aktif, jaga stamina untuk belajar sore!"},
  5:{e:"🤝",label:"Rapat dengan Sensei (Jumat)",sub:"Evaluasi mingguan — catat semua feedback sensei & tanyakan hal yang belum jelas!"},
};

const JEDA_TIPS=[
  {e:"🃏",t:"Quiz Bunpou Kosakata",d:"Buka bunpou-n5-done.base44.app — target 20–30 soal per sesi jeda kelas"},
  {e:"📖",t:"Review LevelUpID",d:"Pilih 1 topik grammar di LevelUpID, baca & buat 3 contoh kalimat sendiri"},
  {e:"✍️",t:"Tulis Ulang Catatan",d:"Buat ringkasan catatan kelas tadi dalam 10 mnt — masuk lebih dalam ke otak!"},
  {e:"😌",t:"Istirahat Aktif",d:"Regangkan badan, minum air, tarik napas — siapkan pikiran segar untuk kelas berikut"},
];

const CM=[
  {n:1,th:"Fondasi & Rutinitas",e:"🌱",p:"17 Mei – 16 Jun",c:"#D97048",f:"Bangun kebiasaan harian yang kuat sejak hari pertama diklat",sp:"⭐ Idul Adha (26 Mei–1 Jun): Refreshing keluarga — tapi jaga ritme belajarmu ya!"},
  {n:2,th:"Konsistensi N5",e:"🔥",p:"17 Jun – 16 Jul",c:"#DC2626",f:"Solidkan fondasi N5 — grammar, kosakata, dan pola kalimat dasar",sp:"☪️ Tahun Baru Islam (17 Jun): Perbaharui niat belajar bahasa Jepang!"},
  {n:3,th:"Percepatan",e:"🌊",p:"17 Jul – 16 Agu",c:"#0F766E",f:"Push menuju materi N4 — tingkatkan kecepatan membaca & mendengar",sp:null},
  {n:4,th:"Pendalaman",e:"🌿",p:"17 Agu – 16 Sep",c:"#15803D",f:"Dalami materi, perbanyak latihan soal & percakapan aktif",sp:"🇮🇩 HUT RI ke-81 (17 Agu): Semangat belajar seperti semangat kemerdekaan!"},
  {n:5,th:"Komunikasi",e:"⚡",p:"17 Sep – 16 Okt",c:"#7C3AED",f:"Fokus speaking & listening — berani bicara bahasa Jepang setiap hari",sp:"☪️ Maulid Nabi (25 Sep): Teladani semangat belajar tanpa henti"},
  {n:6,th:"Panen & Ujian",e:"✨",p:"17 Okt – 17 Nov",c:"#B45309",f:"Persiapkan ujian, review menyeluruh, & rayakan pencapaian 6 bulan!",sp:null},
];

const HAB=[
  {id:"jog",c:"🏃 Olahraga",tx:"Jogging pagi min. 3km (30 mnt)"},
  {id:"apel",c:"🏃 Olahraga",tx:"Apel/Chore jam 08:15 tepat waktu"},
  {id:"und",c:"🏃 Olahraga",tx:"Undoushimasu aktif (Rab & Kam)"},
  {id:"kpagi",c:"📖 Akademik",tx:"Kelas pagi 10:30–12:00: hadir & aktif"},
  {id:"ksore",c:"📖 Akademik",tx:"Kelas sore 13:00–15:00: hadir & aktif"},
  {id:"kaiwa",c:"📖 Akademik",tx:"Kaiwa renshuu aktif (Sen & Sel)"},
  {id:"rapat",c:"📖 Akademik",tx:"Rapat sensei (Jum): tanyakan pertanyaan"},
  {id:"benk",c:"📝 Belajar Mandiri",tx:"Benkyoukai 19:00–20:00: hadir & fokus"},
  {id:"bun",c:"📝 Belajar Mandiri",tx:"Quiz Bunpou kosakata (min. 1 sesi/hari)"},
  {id:"lvl",c:"📝 Belajar Mandiri",tx:"Review materi LevelUpID (min. 30 mnt)"},
  {id:"kanji",c:"📝 Belajar Mandiri",tx:"Latihan menulis / kanji (min. 15 mnt)"},
  {id:"catatan",c:"📝 Belajar Mandiri",tx:"Catat kosakata & grammar baru hari ini"},
  {id:"makan",c:"🍱 Kesehatan",tx:"Sarapan & makan siang bergizi"},
  {id:"hydra",c:"🍱 Kesehatan",tx:"Minum air cukup sepanjang hari"},
  {id:"tidur",c:"🍱 Kesehatan",tx:"Tidur berkualitas setelah benkyoukai"},
];

const RESOURCES=[
  {
    name:"LevelUpID — Japanese N5–N1",
    jpn:"日本語 N5〜N1 テキスト",
    desc:"Materi grammar, kosakata & pola kalimat dari N5 hingga N1 — khusus pelajar Indonesia.",
    url:"https://levelupid-jpn.notion.site/JAPANESE-LANGUAGE-N1-N5-Beginner-Advance-levelupp-id-26faf6a87c86817f97dcceb52e9aaa84",
    e:"📖",tag:"Grammar & Materi",c:"#D97048",
    tips:["Mulai dari N5, selesaikan 1 topik grammar per hari","Setiap grammar baru → buat 3 contoh kalimat sendiri","Gunakan saat jeda 09:00–10:30 atau waktu bebas sore"],
  },
  {
    name:"Bunpou N5 — Quiz Kosakata",
    jpn:"文法 N5 語彙クイズ",
    desc:"Pengganti Anki berbasis web! Quiz kosakata N5 interaktif. Latihan hafalan kosakata setiap hari.",
    url:"https://bunpou-n5-done.base44.app/quiz-kosakata-sesi",
    e:"🃏",tag:"Kosakata & Quiz",c:"#0F766E",
    tips:["Minimal 1 sesi per hari — ideal saat jeda kelas 09:00–10:30","Target: salah <3 soal sebelum lanjut ke set berikutnya","Kata yang salah → ulang 2x lebih banyak dari yang benar"],
  },
];

const p2=n=>String(n).padStart(2,"0");
const dKey=d=>`${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`;
const MF=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAYS_ID=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const DS=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
const tod=new Date(); tod.setHours(0,0,0,0);
const now2=new Date();
const CS=new Date(2026,4,17);
const CE=new Date(2026,10,17);
const dff=(a,b)=>Math.max(0,Math.floor((b-a)/86400000));
const timeToMin=t=>{if(!t)return-1;const[h,m]=t.split(":").map(Number);return h*60+m;};
const nowMin=now2.getHours()*60+now2.getMinutes();
const isWD=d=>d.getDay()!==0&&d.getDay()!==6;
const getCM=d=>{for(const m of CM){const s=new Date(2026,3+m.n,17);const e=m.n===6?new Date(2026,10,18):new Date(2026,4+m.n,17);if(d>=s&&d<e)return m;}return null;};
const mPct=(ch,n)=>{const tot=4*HAB.length;const done=Array.from({length:4},(_,w)=>HAB.filter(h=>ch[`m${n}_w${w+1}_${h.id}`]).length).reduce((a,b)=>a+b,0);return{done,tot,pct:Math.round(done/tot*100)};};
const totPct=ch=>{const tot=6*4*HAB.length;const done=Object.values(ch).filter(Boolean).length;return{done,tot,pct:tot>0?Math.round(done/tot*100):0};};
const calDays=(yr,mo)=>{const f=new Date(yr,mo,1);const n=new Date(yr,mo+1,0).getDate();const days=Array(f.getDay()).fill(null);for(let d=1;d<=n;d++)days.push(new Date(yr,mo,d));return days;};

const TS={
  prep:{bg:"#F0F9FF",bd:"#BAE6FD",tc:"#0369A1"},
  sport:{bg:"#F0FFF4",bd:"#A7F3D0",tc:"#047857"},
  meal:{bg:"#FFF7ED",bd:"#FED7AA",tc:"#C2410C"},
  school:{bg:"#EFF6FF",bd:"#BFDBFE",tc:"#1D4ED8"},
  jeda:{bg:"#FFFBEB",bd:"#FDE68A",tc:"#B45309"},
  class:{bg:"#F5F3FF",bd:"#DDD6FE",tc:"#6D28D9"},
  activity:{bg:"#FDF4FF",bd:"#E9D5FF",tc:"#7C3AED"},
  free:{bg:"#F9FAFB",bd:"#E5E7EB",tc:"#4B5563"},
  study:{bg:"#FFF1F2",bd:"#FECDD3",tc:"#BE123C"},
};

const PBar=({pct,color="#1C4A6E",h=8})=>(
  <div style={{height:h,background:"#DBEAFE",borderRadius:h/2,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:h/2,transition:"width .5s ease"}}/>
  </div>
);

function HomeTab({ch}){
  const{done,tot,pct}=totPct(ch);
  const ds=tod>=CS?dff(CS,tod):0;
  const dl=tod<CE?dff(tod,CE):0;
  const cm=getCM(tod);
  const dow=tod.getDay();
  const todayHol=H[dKey(tod)];
  const upcoming=Object.entries(H).filter(([k])=>new Date(k)>=tod).slice(0,3);
  const curBlock=()=>{
    if(!isWD(tod))return null;
    for(let i=SCHED_WD.length-1;i>=0;i--){if(SCHED_WD[i].time&&timeToMin(SCHED_WD[i].time)<=nowMin)return{...SCHED_WD[i],idx:i};}
    return SCHED_WD[0];
  };
  const cur=curBlock();
  return(
    <div style={{padding:16}}>
      <div style={{background:"linear-gradient(135deg,#1C4A6E,#2A6AA0)",borderRadius:20,padding:"18px 16px",color:"#fff",marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:12,opacity:.8,marginBottom:3}}>🏫 Shiawase Gakkou · 幸せ学校</div>
        <div style={{fontSize:19,fontWeight:800}}>Challenge Shiawase 🌸</div>
        <div style={{fontSize:11,opacity:.82,marginTop:2}}>6 Bulan Diklat Bahasa Jepang 🇯🇵</div>
        <div style={{display:"flex",marginTop:14,background:"rgba(255,255,255,.14)",borderRadius:12,padding:"10px 0"}}>
          {[[ds,"Hari Berjalan"],[pct+"%","Progress"],[dl,"Hari Tersisa"]].map(([v,l],i)=>(
            <div key={i} style={{flex:1,textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,.2)":undefined}}>
              <div style={{fontSize:20,fontWeight:800}}>{v}</div>
              <div style={{fontSize:10,opacity:.82}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
          <span style={{fontWeight:700,fontSize:13}}>Progress Keseluruhan</span>
          <span style={{color:"#1C4A6E",fontWeight:700}}>{pct}%</span>
        </div>
        <PBar pct={pct}/>
        <div style={{fontSize:11,color:"#5A6A80",marginTop:5}}>{done}/{tot} check-in · {pct<20?"Mulai dengan kuat! 🌱":pct<50?"Pertahankan ritme! 🔥":pct<80?"Lebih dari setengah jalan! 🌊":"Hampir finish strong! ✨"}</div>
      </div>

      {!isWD(tod)?(
        <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,borderLeft:"4px solid #0F766E",boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontWeight:800,fontSize:14}}>🎉 Hari Libur — {DAYS_ID[dow]}</div>
          <div style={{fontSize:12,color:"#5A6A80",marginTop:2}}>Tidak ada kelas. Nikmati istirahat & refreshing!</div>
          <div style={{marginTop:8,background:"#F0FFF4",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#047857",lineHeight:1.5}}>💡 Opsional: Bunpou quiz 20 mnt bisa menjaga ritme hafalan kosakata kamu</div>
        </div>
      ):todayHol?(
        <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,borderLeft:`4px solid ${HC[todayHol.t]}`,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontWeight:800,fontSize:14}}>{HE[todayHol.t]} {todayHol.n}</div>
          <div style={{fontSize:12,color:"#5A6A80",marginTop:2}}>Hari libur nasional — kemungkinan tidak ada kegiatan diklat</div>
        </div>
      ):cur?(
        <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,borderLeft:`4px solid ${TS[cur.type]?.tc||"#1C4A6E"}`,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{fontSize:10,color:"#5A6A80",fontWeight:700,letterSpacing:.8}}>SEKARANG · {DAYS_ID[dow]}</div>
            <div style={{background:"#1C4A6E",color:"#fff",borderRadius:6,padding:"2px 7px",fontSize:9,fontWeight:700}}>AKTIF</div>
          </div>
          <div style={{fontWeight:800,fontSize:14,marginTop:3}}>
            {cur.e} {cur.type==="activity"&&DAY_ACT[dow]?DAY_ACT[dow].label:cur.label}
          </div>
          {cur.type==="activity"&&DAY_ACT[dow]&&<div style={{fontSize:11,color:"#5A6A80",marginTop:2}}>{DAY_ACT[dow].sub}</div>}
          {cur.tip&&cur.type!=="activity"&&<div style={{marginTop:8,background:"#FFFBEB",borderRadius:8,padding:"6px 10px",fontSize:11,color:"#92400E",lineHeight:1.5}}>{cur.tip}</div>}
        </div>
      ):null}

      {cm&&(
        <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,borderLeft:`4px solid ${cm.c}`,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:10,color:"#5A6A80",fontWeight:700,letterSpacing:.8}}>BULAN {cm.n} DARI 6 · {cm.p}</div>
          <div style={{fontWeight:800,fontSize:14,marginTop:2}}>{cm.e} {cm.th}</div>
          <div style={{fontSize:12,color:"#5A6A80",marginTop:1}}>{cm.f}</div>
          {cm.sp&&<div style={{marginTop:8,background:"#FFFBEB",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#92400E",lineHeight:1.5}}>{cm.sp}</div>}
        </div>
      )}

      {isWD(tod)&&!todayHol&&<>
        <div style={{fontWeight:700,fontSize:13,margin:"12px 0 8px"}}>⏳ Tips Jeda Kelas (09:00–10:30)</div>
        {JEDA_TIPS.slice(0,2).map((j,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",gap:10,boxShadow:"0 2px 8px rgba(0,0,0,.04)",borderLeft:"3px solid #D4A843"}}>
            <div style={{fontSize:22,flexShrink:0}}>{j.e}</div>
            <div><div style={{fontWeight:700,fontSize:12}}>{j.t}</div><div style={{fontSize:11,color:"#5A6A80",marginTop:2,lineHeight:1.5}}>{j.d}</div></div>
          </div>
        ))}
      </>}

      <div style={{fontWeight:700,fontSize:13,margin:"12px 0 8px"}}>📅 Libur Nasional Mendatang</div>
      {upcoming.map(([k,v])=>{
        const date=new Date(k);const d=dff(tod,date);
        return(
          <div key={k} style={{background:"#fff",borderRadius:12,padding:"9px 14px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div>
              <div style={{fontWeight:700,fontSize:12,color:HC[v.t]}}>{HE[v.t]} {v.s}</div>
              <div style={{fontSize:11,color:"#5A6A80"}}>{date.toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"long"})}</div>
            </div>
            <div style={{background:HC[v.t]+"18",color:HC[v.t],borderRadius:8,padding:"3px 10px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{d===0?"Hari ini":d===1?"Besok":`${d} hari`}</div>
          </div>
        );
      })}
    </div>
  );
}

function JadwalTab(){
  const dow=tod.getDay();
  const[selDay,setSelDay]=useState(dow);
  const viewIsWE=selDay===0||selDay===6;
  const sched=viewIsWE?SCHED_WE:SCHED_WD;
  const curIdx=()=>{
    if(selDay!==dow||viewIsWE)return-1;
    for(let i=sched.length-1;i>=0;i--){if(sched[i].time&&timeToMin(sched[i].time)<=nowMin)return i;}
    return-1;
  };
  const ci=curIdx();
  return(
    <div style={{padding:16}}>
      <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
        {DS.map((d,i)=>{
          const isT=i===dow;const isSel=i===selDay;
          return(
            <div key={i} onClick={()=>setSelDay(i)} style={{flexShrink:0,minWidth:44,textAlign:"center",padding:"7px 4px",borderRadius:10,cursor:"pointer",background:isSel?"#1C4A6E":isT?"#EEF4FF":"#fff",color:isSel?"#fff":isT?"#1C4A6E":i===0||i===6?"#DC2626":"#2C2416",border:isSel?"2px solid transparent":isT?"2px solid #1C4A6E":"2px solid #DBEAFE",fontWeight:isSel||isT?800:500,fontSize:11}}>
              <div>{d}</div>
              {i!==0&&i!==6&&<div style={{fontSize:8,opacity:.65,marginTop:1}}>📖</div>}
            </div>
          );
        })}
      </div>

      <div style={{background:"linear-gradient(135deg,#1C4A6E,#2A6AA0)",borderRadius:14,padding:"12px 16px",marginBottom:12,color:"#fff"}}>
        <div style={{fontWeight:800,fontSize:14}}>{DAYS_ID[selDay]}</div>
        <div style={{fontSize:11,opacity:.85,marginTop:2}}>
          {viewIsWE?"🎉 Hari Libur — bebas & refreshing!":DAY_ACT[selDay]?`${DAY_ACT[selDay].e} ${DAY_ACT[selDay].label} setelah kelas`:"📖 Hari Belajar Reguler"}
        </div>
        {!viewIsWE&&DAY_ACT[selDay]&&<div style={{fontSize:10,opacity:.78,marginTop:2,lineHeight:1.4}}>{DAY_ACT[selDay].sub}</div>}
      </div>

      {sched.map((s,i)=>{
        const isCur=i===ci;
        const ts=TS[s.type]||TS.free;
        const lbl=s.type==="activity"&&DAY_ACT[selDay]?DAY_ACT[selDay].label:s.label;
        const tip2=s.type==="activity"&&DAY_ACT[selDay]?DAY_ACT[selDay].sub:s.tip;
        return(
          <div key={i} style={{display:"flex",gap:10,marginBottom:7,alignItems:"flex-start"}}>
            <div style={{width:44,flexShrink:0,textAlign:"right",paddingTop:11}}>
              <div style={{fontSize:10,fontWeight:700,color:isCur?"#1C4A6E":"#7A8A9A",lineHeight:1}}>{s.time||"—"}</div>
            </div>
            <div style={{width:2,background:isCur?"#1C4A6E":"#DBEAFE",flexShrink:0,borderRadius:1,alignSelf:"stretch",minHeight:36}}/>
            <div style={{flex:1,background:isCur?"#EEF4FF":ts.bg,borderRadius:12,padding:"9px 12px",border:`1px solid ${isCur?"#BFDBFE":ts.bd}`,position:"relative"}}>
              {isCur&&<div style={{position:"absolute",top:-5,right:8,background:"#1C4A6E",color:"#fff",borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:700}}>SEKARANG</div>}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:17,flexShrink:0}}>{s.e}</span>
                <div style={{fontWeight:700,fontSize:12,color:isCur?"#1C4A6E":ts.tc,lineHeight:1.3}}>{lbl}</div>
              </div>
              {tip2&&<div style={{fontSize:10,color:"#5A6A80",marginTop:5,lineHeight:1.5,paddingLeft:25}}>{tip2}</div>}
            </div>
          </div>
        );
      })}

      {!viewIsWE&&(
        <div style={{background:"#fff",borderRadius:14,padding:"12px 14px",marginTop:6,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:10,color:"#B45309"}}>⏳ Maksimalkan Jeda 09:00–10:30</div>
          {JEDA_TIPS.map((j,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:i<JEDA_TIPS.length-1?9:0,paddingBottom:i<JEDA_TIPS.length-1?9:0,borderBottom:i<JEDA_TIPS.length-1?"1px solid #EEF4FF":undefined}}>
              <div style={{fontSize:20,flexShrink:0}}>{j.e}</div>
              <div><div style={{fontWeight:700,fontSize:12}}>{j.t}</div><div style={{fontSize:10,color:"#5A6A80",lineHeight:1.4,marginTop:2}}>{j.d}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CkTab({ch,tog}){
  const curN=getCM(tod)?.n||1;
  const[am,setAm]=useState(curN);
  const[ow,setOw]=useState(1);
  const cm=CM.find(m=>m.n===am);
  const{done,tot,pct}=mPct(ch,am);
  const cats=[...new Set(HAB.map(h=>h.c))];
  return(
    <div style={{padding:16}}>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:12,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
        {CM.map(m=>{
          const{pct:mp}=mPct(ch,m.n);const ac=m.n===am;
          return(
            <div key={m.n} onClick={()=>{setAm(m.n);setOw(1);}} style={{flexShrink:0,background:ac?m.c:"#fff",color:ac?"#fff":"#2C2416",borderRadius:12,padding:"8px 12px",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.06)",border:ac?"2px solid transparent":"2px solid #DBEAFE",minWidth:82,textAlign:"center"}}>
              <div style={{fontSize:18}}>{m.e}</div>
              <div style={{fontSize:10,fontWeight:700}}>Bln {m.n}</div>
              <div style={{fontSize:10,opacity:.8}}>{mp}%</div>
            </div>
          );
        })}
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:"12px 16px",marginBottom:12,borderLeft:`4px solid ${cm.c}`,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
        <div style={{fontSize:10,color:"#5A6A80",fontWeight:700,letterSpacing:.8}}>BULAN {cm.n} — {cm.p}</div>
        <div style={{fontWeight:800,fontSize:14,marginTop:2}}>{cm.e} {cm.th}</div>
        <div style={{fontSize:12,color:"#5A6A80",marginTop:1}}>{cm.f}</div>
        <div style={{marginTop:10}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
            <span style={{fontWeight:700}}>Progress Bulan {cm.n}</span>
            <span style={{color:cm.c,fontWeight:700}}>{done}/{tot} ({pct}%)</span>
          </div>
          <PBar pct={pct} color={cm.c}/>
        </div>
        {cm.sp&&<div style={{marginTop:8,background:"#FFFBEB",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#92400E",lineHeight:1.5}}>{cm.sp}</div>}
      </div>
      {[1,2,3,4].map(w=>{
        const wd2=HAB.filter(h=>ch[`m${am}_w${w}_${h.id}`]).length;
        const wp=Math.round(wd2/HAB.length*100);const open=ow===w;
        return(
          <div key={w} style={{background:"#fff",borderRadius:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.05)",overflow:"hidden"}}>
            <div onClick={()=>setOw(open?0:w)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",cursor:"pointer"}}>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>Minggu {w} · Bulan {am}</div>
                <div style={{fontSize:11,color:"#5A6A80",marginTop:1}}>{wd2}/{HAB.length} kebiasaan · {wp}%</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:40,height:5,background:"#DBEAFE",borderRadius:3,overflow:"hidden"}}><div style={{width:`${wp}%`,height:"100%",background:cm.c,borderRadius:3}}/></div>
                <div style={{color:"#5A6A80",fontSize:13}}>{open?"▲":"▼"}</div>
              </div>
            </div>
            {open&&(
              <div style={{borderTop:"1px solid #EEF4FF",padding:"10px 14px"}}>
                {cats.map(cat=>(
                  <div key={cat} style={{marginBottom:14}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#5A6A80",letterSpacing:.8,marginBottom:6,textTransform:"uppercase"}}>{cat}</div>
                    {HAB.filter(h=>h.c===cat).map(h=>{
                      const hk=`m${am}_w${w}_${h.id}`;const dn=!!ch[hk];
                      return(
                        <div key={h.id} onClick={()=>tog(hk)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 6px",borderRadius:10,cursor:"pointer",marginBottom:3,background:dn?"#EEF4FF":"transparent"}}>
                          <div style={{width:22,height:22,borderRadius:7,border:`2px solid ${dn?cm.c:"#BFDBFE"}`,background:dn?cm.c:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                            {dn&&<span style={{color:"#fff",fontSize:13,fontWeight:800,lineHeight:1}}>✓</span>}
                          </div>
                          <span style={{fontSize:12,color:dn?"#1C4A6E":"#2C2416",fontWeight:dn?700:500,textDecoration:dn?"line-through":"none"}}>{h.tx}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function BelajarTab(){
  const[openTips,setOpenTips]=useState(null);
  const studyPlan=[
    {time:"09:00–10:30",label:"Jeda Kelas Pagi",act:"Quiz Bunpou kosakata 20–30 soal + review 1 topik grammar LevelUpID",e:"⏳",c:"#B45309"},
    {time:"12:00–12:30",label:"Istirahat Siang",act:"Makan → review ringkasan catatan kelas pagi dalam 10 menit",e:"🍱",c:"#C2410C"},
    {time:"16:30–19:00",label:"Waktu Bebas Sore",act:"Self-study LevelUpID: 1 topik baru + latihan kanji 15 mnt",e:"📖",c:"#0F766E"},
    {time:"20:00–20:30",label:"Setelah Benkyoukai",act:"Opsional: Bunpou quiz ringan atau review catatan benkyoukai",e:"🌙",c:"#1C4A6E"},
    {time:"Sabtu–Minggu",label:"Akhir Pekan",act:"LevelUpID review santai + Bunpou 1 sesi — jangan break total dari belajar!",e:"🎯",c:"#7C3AED"},
  ];
  return(
    <div style={{padding:16}}>
      <div style={{background:"linear-gradient(135deg,#1C4A6E,#2A6AA0)",borderRadius:16,padding:"14px 16px",marginBottom:12,color:"#fff"}}>
        <div style={{fontWeight:800,fontSize:14,marginBottom:3}}>🇯🇵 Sumber Belajar Bahasa Jepang</div>
        <div style={{fontSize:11,opacity:.85,lineHeight:1.5}}>Dua resource utama yang kamu gunakan setiap hari — optimalkan keduanya!</div>
      </div>

      {RESOURCES.map((r,ri)=>(
        <div key={ri} style={{background:"#fff",borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",borderLeft:`4px solid ${r.c}`}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
            <div style={{fontSize:26,flexShrink:0}}>{r.e}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:13,color:r.c}}>{r.name}</div>
              <div style={{fontSize:10,color:"#7A8A9A",marginTop:1}}>{r.jpn}</div>
              <div style={{fontSize:11,color:"#5A6A80",marginTop:4,lineHeight:1.5}}>{r.desc}</div>
            </div>
          </div>
          <a href={r.url} target="_blank" rel="noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,background:r.c,color:"#fff",borderRadius:10,padding:"9px 14px",fontSize:12,fontWeight:700,textDecoration:"none",marginBottom:8}}>
            🔗 Buka {r.tag} →
          </a>
          <div onClick={()=>setOpenTips(openTips===ri?null:ri)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",padding:"5px 2px"}}>
            <span style={{fontSize:12,fontWeight:700,color:r.c}}>💡 Tips Penggunaan Efektif</span>
            <span style={{fontSize:12,color:"#5A6A80"}}>{openTips===ri?"▲":"▼"}</span>
          </div>
          {openTips===ri&&(
            <div style={{marginTop:7,borderTop:"1px solid #EEF4FF",paddingTop:8}}>
              {r.tips.map((tip,ti)=>(
                <div key={ti} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{color:r.c,fontWeight:800,fontSize:14,flexShrink:0,lineHeight:1.4}}>•</span>
                  <span style={{fontSize:11,color:"#2C2416",lineHeight:1.5}}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div style={{fontWeight:700,fontSize:13,margin:"4px 0 10px"}}>📅 Jadwal Belajar Mandiri Harian</div>
      {studyPlan.map((s,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",gap:10,alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
          <div style={{fontSize:20,flexShrink:0,marginTop:2}}>{s.e}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
              <span style={{fontWeight:700,fontSize:12}}>{s.label}</span>
              <span style={{background:s.c+"18",color:s.c,borderRadius:5,padding:"1px 7px",fontSize:9,fontWeight:700,whiteSpace:"nowrap"}}>{s.time}</span>
            </div>
            <div style={{fontSize:11,color:"#5A6A80",lineHeight:1.5}}>{s.act}</div>
          </div>
        </div>
      ))}

      <div style={{background:"#EEF4FF",borderRadius:12,padding:"12px 14px",marginTop:2,marginBottom:4,borderLeft:"4px solid #1C4A6E"}}>
        <div style={{fontWeight:700,fontSize:12,color:"#1C4A6E",marginBottom:7}}>🎯 Target per Bulan Challenge</div>
        {["Bln 1–2: Kuasai semua kosakata & grammar N5 (Bunpou + LevelUpID)","Bln 3–4: Mulai materi N4, tingkatkan kecepatan baca & dengar","Bln 5: Fokus speaking kaiwa & JLPT N4 listening","Bln 6: Review menyeluruh & simulasi ujian JLPT"].map((t,i)=>(
          <div key={i} style={{fontSize:11,color:"#1C4A6E",marginBottom:4,display:"flex",gap:7}}>
            <span style={{fontWeight:800}}>•</span><span style={{lineHeight:1.5}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App(){
  const[tab,setTab]=useState("home");
  const[ch,setCh]=useState({});
  const[ready,setReady]=useState(false);

  useEffect(()=>{
    const lk=document.createElement("link");
    lk.href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap";
    lk.rel="stylesheet";
    document.head.appendChild(lk);
    (async()=>{
      try{const r=await window.storage.get("shi_v3");if(r&&r.value)setCh(JSON.parse(r.value));}
      catch(e){}
      setReady(true);
    })();
  },[]);

  const tog=id=>{
    const n={...ch,[id]:!ch[id]};
    setCh(n);
    (async()=>{try{await window.storage.set("shi_v3",JSON.stringify(n));}catch(e){}})();
  };

  if(!ready)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#EEF4FF",fontWeight:700,color:"#1C4A6E",fontSize:15,fontFamily:"sans-serif"}}>
      🌸 Memuat...
    </div>
  );

  const navItems=[
    {id:"home",e:"🏠",l:"Beranda"},
    {id:"jadwal",e:"⏰",l:"Jadwal"},
    {id:"ck",e:"✅",l:"Checklist"},
    {id:"belajar",e:"📚",l:"Belajar"},
  ];
  const{pct}=totPct(ch);

  return(
    <div style={{fontFamily:"'Nunito','Segoe UI',sans-serif",background:"#F0F4FF",height:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",color:"#1A2740",overflowX:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,#1C4A6E,#2A6AA0)",padding:"11px 16px 9px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{color:"#fff",fontWeight:800,fontSize:15}}>🌸 Challenge Shiawase</div>
            <div style={{color:"rgba(255,255,255,.72)",fontSize:10}}>
              {DAYS_ID[tod.getDay()]} · {tod.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})} · 🏫 Shiawase Gakkou
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,.16)",borderRadius:10,padding:"4px 11px",color:"#fff",fontSize:11,fontWeight:700}}>{pct}% ✓</div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
        {tab==="home"&&<HomeTab ch={ch}/>}
        {tab==="jadwal"&&<JadwalTab/>}
        {tab==="ck"&&<CkTab ch={ch} tog={tog}/>}
        {tab==="belajar"&&<BelajarTab/>}
      </div>

      <div style={{background:"#fff",borderTop:"1px solid #DBEAFE",display:"flex",flexShrink:0,boxShadow:"0 -3px 14px rgba(28,74,110,.1)"}}>
        {navItems.map(({id,e,l})=>(
          <div key={id} onClick={()=>setTab(id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"7px 4px 9px",cursor:"pointer",color:tab===id?"#1C4A6E":"#7A8A9A",transition:"color .2s"}}>
            <div style={{fontSize:20}}>{e}</div>
            <div style={{fontSize:9,fontWeight:700,marginTop:1}}>{l}</div>
            {tab===id&&<div style={{width:20,height:3,background:"#1C4A6E",borderRadius:2,marginTop:3}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}
