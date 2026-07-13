
import React, { useState, useEffect } from 'react';

// ==========================================
// CENTRAL HANDOUT RESOURCES (EXACT TEXT)
// ==========================================
const CURRICULUM_DATA = {
  1: {
    title: "Week 1 — Knowing Allah & Iman",
    description: "The foundations of knowledge: Your Rabb, Your Deen, and your Prophet.",
    sessions: {
      1: { title: "Session 1: Who Is Your Rabb? Where Is Allah?", sourceQ: [1, 2, 3, 4, 5] },
      2: { title: "Session 2: Messengers, Islam & the Pillars", sourceQ: [6, 7, 8, 9, 10] },
      3: { title: "Session 3: Angels, Books, Qadar & the Two Shahadatain", sourceQ: [11, 12, 13, 14, 15] }
    }
  },
  2: {
    title: "Week 2 — Tawheed in Depth & Shirk",
    description: "Deepening monotheism and identifying Greater, Lesser, and Latent Shirk.",
    sessions: {
      4: { title: "Session 4: The Seven Conditions of the Shahada", sourceQ: [16, 17] },
      5: { title: "Session 5: The Three Categories of Tawheed & Ibadah", sourceQ: [18, 19, 20, 21] },
      6: { title: "Session 6: Shirk — Greater and Lesser", sourceQ: [22, 23, 24, 25] }
    }
  },
  3: {
    title: "Week 3 — Kufr, Hypocrisy & Living It Out",
    description: "Understanding the Nullifiers of Islam, types of Kufr, and operational hypocrisy.",
    sessions: {
      7: { title: "Session 7: Latent Shirk & the Types of Kufr", sourceQ: [26, 27, 28, 29] },
      8: { title: "Session 8: Hypocrisy & the Nullifiers of Islam", sourceQ: [30, 31, 32] },
      9: { title: "Session 9: Three Fundamentals, Taghut & Review", sourceQ: [33, 34, 35] }
    }
  }
};

const HANDOUT_QUESTIONS = [
  // WEEK 1 — SESSION 1
  { id: 1, week: 1, q: "Who is your Rabb (the Lord)?", a: "My Rabb is Allah Who has created me and all that exists. He nourishes me and all creatures by His Bounties.", opts: ["A famous person or historical king", "My Rabb is Allah Who has created me and all that exists. He nourishes me and all creatures by His Bounties.", "My parents and family elders", "An angel who controls nature"] },
  { id: 2, week: 1, q: "What is your Deen (religion)?", a: "My Deen is Islam, which is submission and obedience to the order of Allah and His Messenger with love, hoping for his reward and fearing His punishment.", opts: ["A set of cultural celebrations passed down over generations", "A meditation style to keep the mind calm", "My Deen is Islam, which is submission and obedience to the order of Allah and His Messenger with love, hoping for his reward and fearing His punishment.", "A political philosophy focused on state rule"] },
  { id: 3, week: 1, q: "How did you know Allah?", a: "I know Him by His sign and creation, like the day and night, the sun and the moon, the heaven and the earth, and all that is in and between them.", opts: ["I know Him by His sign and creation, like the day and night, the sun and the moon, the heaven and the earth, and all that is in and between them.", "Through philosophical guessing and deep mathematics alone", "By looking at pictures and ancient art items", "Through dreams and imagining random shapes"] },
  { id: 4, week: 1, q: "Where is Allah?", a: "Allah is above the heavens, above the Throne and separated from His creatures.", opts: ["He is inside the physical objects of the earth", "Everywhere inside everything physically", "Allah is above the heavens, above the Throne and separated from His creatures.", "He resides only in the wind and air"] },
  { id: 5, week: 1, q: "How do you worship Allah?", a: "I worship Allah according to the teachings of Prophet Muhammad (S.A.W). I worship Him Alone, ascribing no partner to Him.", opts: ["By following whatever customs my society invents", "I worship Allah according to the teachings of Prophet Muhammad (S.A.W). I worship Him Alone, ascribing no partner to Him.", "By neglecting the Sunnah and relying on personal feelings", "By calling upon secondary intermediaries to help me"] },

  // WEEK 1 — SESSION 2
  { id: 6, week: 1, q: "Why did Allah send Messengers?", a: "Allah sent Messengers to call people to worship Him Alone and ascribe no partner to Him, so that mankind have no excuse for disobeying Allah.", opts: ["To establish temporary empires and rule worldly wealth", "To teach history and literature lessons", "Allah sent Messengers to call people to worship Him Alone and ascribe no partner to Him, so that mankind have no excuse for disobeying Allah.", "To show miracles for entertainment purposes"] },
  { id: 7, week: 1, q: "What is the meaning of Islam?", a: "Islam means submission to Allah, sincerely and willingly.", opts: ["Islam means submission to Allah, sincerely and willingly.", "It means fighting for cultural victory", "It means performing oral recitations without heart commitment", "It translates to keeping your beliefs hidden from people"] },
  { id: 8, week: 1, q: "What are the Pillars of Islam?", a: "There are five: (1) Testimony of faith; (2) Salaat; (3) Zakaat; (4) Saum; (5) Hajj, if one can afford it.", opts: ["Six pillars including believing in the Angels", "Three pillars: Salah, Fasting, and good manners", "There are five: (1) Testimony of faith; (2) Salaat; (3) Zakaat; (4) Saum; (5) Hajj, if one can afford it.", "Four elements: belief, intention, speech, and charity"] },
  { id: 9, week: 1, q: "What is Iman?", a: "Iman (Faith) means to believe in the heart, to confess by the tongue, and to act with the parts of the body.", opts: ["Iman (Faith) means to believe in the heart, to confess by the tongue, and to act with the parts of the body.", "Belief in the mind alone without actions or vocal speech", "An unchangeable feeling that does not increase or decrease", "Saying words with the tongue while rejecting them inside the heart"] },
  { id: 10, week: 1, q: "What are the Pillars of Iman?", a: "Six: to believe in (1) Allah, (2) His Angels, (3) His Messengers, (4) His Books, (5) the Last Day, (6) Divine Preordainment — its good or bad consequences.", opts: ["Five: Testimony, Prayer, Zakat, Fasting, and Hajj", "Six: to believe in (1) Allah, (2) His Angels, (3) His Messengers, (4) His Books, (5) the Last Day, (6) Divine Preordainment — its good or bad consequences.", "Four: Allah, the Angels, the Books, and the Prophets", "Seven foundational articles of action"] },

  // WEEK 1 — SESSION 3
  { id: 11, week: 1, q: "Who are the angels?", a: "The angels are creatures of light. They are Allah's obedient slaves; they do what they are commanded and are incapable of disobedience.", opts: ["The spirits of righteous human beings who passed away", "The angels are creatures of light. They are Allah's obedient slaves; they do what they are commanded and are incapable of disobedience.", "Independent entities that choose between good and evil", "Creatures made from fire that frequently argue or revolt"] },
  { id: 12, week: 1, q: "What is belief in the Last Day?", a: "To believe Allah has foreordained a fixed term for everything. He will raise the dead and take account of every deed; on the Day of Resurrection, rewards and punishments will be justly assigned.", opts: ["To believe Allah has foreordained a fixed term for everything. He will raise the dead and take account of every deed; on the Day of Resurrection, rewards and punishments will be justly assigned.", "Believing this world will continue forever without an end", "Believing people are immediately reborn into new bodies on earth", "Believing only major prophets will face accountability scales"] },
  { id: 13, week: 1, q: "What is belief in Qadar (Foreordainment)?", a: "To believe that everything, good or bad, happens according to what Allah has foreordained — He created everything by a decree and in due proportion.", opts: ["Believing humans have zero choices and are forced like rocks", "To believe that everything, good or bad, happens according to what Allah has foreordained — He created everything by a decree and in due proportion.", "Believing the universe happens completely by random luck", "Believing good actions are preordained but bad actions are uncreated"] },
  { id: 14, week: 1, q: "What is the meaning of 'There is no god but Allah'?", a: "That there is no god who deserves to be worshipped except Allah Alone — negating all false gods and affirming Allah as the only true God.", opts: ["That Allah is simply the strongest among many existing gods", "That there is no god who deserves to be worshipped except Allah Alone — negating all false gods and affirming Allah as the only true God.", "That we can worship other objects to reach Allah faster", "A phrase repeated without any specific practical conditions"] },
  { id: 15, week: 1, q: "What is the meaning of 'Muhammad (S.A.W) is the Messenger of Allah'?", a: "Obeying him in whatever he commanded, avoiding what he forbade, and believing all that he informed us of.", opts: ["Respecting his history without applying his rules to daily actions", "Believing he was an ordinary philosopher with smart advice", "Obeying him in whatever he commanded, avoiding what he forbade, and believing all that he informed us of.", "Following his rules only when they align with modern trends"] },

  // WEEK 2 — SESSION 4
  { id: 16, week: 2, q: "What are the conditions of the testimony of Iman?", a: "Seven: (1) al-'Ilm, (2) al-Yaqeen, (3) al-Ikhlas, (4) as-Sidq, (5) al-Hubb, (6) al-Inqiyad, (7) al-Qabool.", opts: ["Five conditions centered on simple physical actions", "Seven: (1) al-'Ilm, (2) al-Yaqeen, (3) al-Ikhlas, (4) as-Sidq, (5) al-Hubb, (6) al-Inqiyad, (7) al-Qabool.", "Three components: knowledge, speech, and movement", "Nine pillars starting with absolute isolation"] },
  { id: 17, week: 2, q: "What is the greatest thing Allah has enjoined?", a: "The greatest thing that Allah has enjoined is Tawheed (the Oneness of Allah).", opts: ["Building beautiful mosques across the globe", "The greatest thing that Allah has enjoined is Tawheed (the Oneness of Allah).", "Acquiring historical texts and certificates", "Performing charity while ignoring foundational faith components"] },

  // WEEK 2 — SESSION 5
  { id: 18, week: 2, q: "What is Tawheed?", a: "Declaring Allah to be the only true God who deserves to be worshipped in truth, and confirming all the attributes with which He has qualified Himself or that His Messenger (S.A.W) attributed to Him.", opts: ["Declaring Allah to be the only true God who deserves to be worshipped in truth, and confirming all the attributes with which He has qualified Himself or that His Messenger (S.A.W) attributed to Him.", "Believing in a creator while executing sacrifices to idols", "A philosophical system that avoids the Sunnah entirely", "Accepting lordship while validating secular obedience overrides"] },
  { id: 19, week: 2, q: "What are the aspects of Tawheed?", a: "Three: (1) Tawheed ar-Rububiyah, (2) Tawheed al-Uluhiyah, (3) Tawheed al-Asma was-Sifat.", opts: ["Two aspects: internal faith and external movements", "Three: (1) Tawheed ar-Rububiyah, (2) Tawheed al-Uluhiyah, (3) Tawheed al-Asma was-Sifat.", "Four categories including the rules of social politics", "A single unified component that cannot be divided for learning"] },
  { id: 20, week: 2, q: "How would you describe Ibadah?", a: "A comprehensive word comprising deeds and words that Allah loves and is pleased with, whether manifested or hidden.", opts: ["A comprehensive word comprising deeds and words that Allah loves and is pleased with, whether manifested or hidden.", "The performance of the five daily ritual prayers exclusively", "Acts of charity done to impress society members", "Isolated supplications performed only inside the masjid environment"] },
  { id: 21, week: 2, q: "What are the conditions of Ibadah?", a: "Two: (1) Sincerity; (2) Submission to Allah's Messenger (S.A.W) — acting according to his Sunnah.", opts: ["Three: Wealth, high focus, and a clean environment", "A single requirement: having a clean intention in your heart", "Two: (1) Sincerity; (2) Submission to Allah's Messenger (S.A.W) — acting according to his Sunnah.", "Following the actions of your family and national traditions"] },

  // WEEK 2 — SESSION 6
  { id: 22, week: 2, q: "What is the greatest sin that Allah has forbidden?", a: "The greatest sin which Allah has forbidden is Shirk (polytheism).", opts: ["Telling minor lies when dealing with business transactions", "Disobeying the rules of personal hygiene", "The greatest sin which Allah has forbidden is Shirk (polytheism).", "Stealing property items from a public workspace area"] },
  { id: 23, week: 2, q: "What is polytheism?", a: "To believe there is one who shares Allah in His acts — ascribing partners or setting up rivals to Allah.", opts: ["To believe there is one who shares Allah in His acts — ascribing partners or setting up rivals to Allah.", "Forgetting your daily remembrance prayers due to schoolwork", "Committing errors in your religious practice due to poor knowledge", "Disbursing your charity money to the wrong causes intentionally"] },
  { id: 24, week: 2, q: "What are the types of polytheism?", a: "Three: (1) Greater polytheism (Shirk Akbar), (2) Lesser polytheism (Shirk Asghar), (3) Latent polytheism (Shirk Khafi).", opts: ["Two types: visible and invisible shirk elements", "Three: (1) Greater polytheism (Shirk Akbar), (2) Lesser polytheism (Shirk Asghar), (3) Latent polytheism (Shirk Khafi).", "Four categories related to separate historical nations", "Only one unified category that completely clears a person from Islam"] },
  { id: 25, week: 2, q: "What is greater polytheism?", a: "Devoting any form of worship to other than Allah. Allah will never forgive one who dies upon Shirk, nor accept his good deeds, and he is cast out from the folds of Islam.", opts: ["Performing a good deed to get noticed by friends", "Devoting any form of worship to other than Allah. Allah will never forgive one who dies upon Shirk, nor accept his good deeds, and he is cast out from the folds of Islam.", "Feeling an internal doubt that you quickly fight off", "An action that reduces your scale metrics without resetting your Islamic status"] },

  // WEEK 3 — SESSION 7
  { id: 26, week: 3, q: "What is latent polytheism?", a: "It implies being dissatisfied with the conditions ordained by Allah.", opts: ["Displaying your worship openly to gain validation", "It implies being dissatisfied with the conditions ordained by Allah.", "Worshipping a physical object or idol openly", "Denying that the Prophet Muhammad (S.A.W) is the last Messenger"] },
  { id: 27, week: 3, q: "What is the proof of the latent polytheism?", a: "The Prophet (S.A.W) said: 'The latent polytheism is more hidden in this nation than the track of a black ant over a black stone on a dark night.' (Musnad Ahmad)", opts: ["The Prophet (S.A.W) said: 'The latent polytheism is more hidden in this nation than the track of a black ant over a black stone on a dark night.' (Musnad Ahmad)", "A historical narration focusing on the construction of the Kaaba", "An isolated statement concerning standard commercial trade laws", "There are no written proofs from the classical Sunnah compilations"] },
  { id: 28, week: 3, q: "What are the types of Kufr (disbelief)?", a: "Two: (1) Major Kufr, which casts its people out of Islam; (2) Minor Kufr, which does not — it is the Kufr of ungratefulness.", opts: ["Three distinct types that relate to separate mental ideas", "Two: (1) Major Kufr, which casts its people out of Islam; (2) Minor Kufr, which does not — it is the Kufr of ungratefulness.", "Five categories linked directly to political disputes", "A single absolute mode that acts uniformly across every misstep"] },
  { id: 29, week: 3, q: "What are the types of major Kufr?", a: "Five: the Kufr of denial, the Kufr of arrogance (despite recognizing the truth), the Kufr of doubt, the Kufr of disregard, and the Kufr of hypocrisy.", opts: ["Four items matching the aspects of basic operational polytheism", "Two styles: explicit rejection and secret internal agreement", "Five: the Kufr of denial, the Kufr of arrogance (despite recognizing the truth), the Kufr of doubt, the Kufr of disregard, and the Kufr of hypocrisy.", "Three levels tied to historical regional events"] },

  // WEEK 3 — SESSION 8
  { id: 30, week: 3, q: "What are the categories of hypocrisy?", a: "Two: (1) Hypocrisy in belief; (2) Hypocrisy in deeds and actions.", opts: ["Two: (1) Hypocrisy in belief; (2) Hypocrisy in deeds and actions.", "Three categories matching tribal divisions", "A single framework that only applies to open verbal lies", "Four models dealing with wealth and standard business dealings"] },
  { id: 31, week: 3, q: "What is hypocrisy in belief?", a: "Six types: denying the Messenger (S.A.W); denying what he was sent with; hating the Messenger; hating what he was sent with; rejoicing at the disgrace of Islam; and disliking the prevalence of Islam.", opts: ["Lying when you speak and breaking promises you make to people", "Six types: denying the Messenger (S.A.W); denying what he was sent with; hating the Messenger; hating what he was sent with; rejoicing at the disgrace of Islam; and disliking the prevalence of Islam.", "Committing layout errors inside your standard prayer sequences", "Betraying a business partner during a trade agreement step"] },
  { id: 32, week: 3, q: "What are the nullifiers of Islam?", a: "Ten — among them: polytheism of worship; not believing polytheists are disbelievers; setting up intermediaries between oneself and Allah; believing others' guidance is more perfect than the Prophet's; hating what the Prophet was sent with; denying or ridiculing the Prophet's Deen; sorcery; and supporting polytheists against Muslims.", opts: ["Five actions that reduce your internal spiritual experience scores", "Ten — among them: polytheism of worship; not believing polytheists are disbelievers; setting up intermediaries between oneself and Allah; believing others' guidance is more perfect than the Prophet's; hating what the Prophet was sent with; denying or ridiculing the Prophet's Deen; sorcery; and supporting polytheists against Muslims.", "Eight specific statements about world histories", "Twelve minor character traits that involve anger problems"] },

  // WEEK 3 — SESSION 9
  { id: 33, week: 3, q: "What are the three fundamentals every Muslim must learn?", a: "(1) Knowing your Rabb; (2) Knowing your Deen (Islam); (3) Knowing your Prophet Muhammad (S.A.W).", opts: ["Knowing your ancestry, lineage, and geographic origins", "Learning Arabic grammar, logic systems, and script histories", "(1) Knowing your Rabb; (2) Knowing your Deen (Islam); (3) Knowing your Prophet Muhammad (S.A.W).", "The historical timelines of the early caliphates"] },
  { id: 34, week: 3, q: "What is Taghut?", a: "Everything that is worshipped, followed, or obeyed other than Allah is Taghut.", opts: ["An ancient city located in historic regions", "Everything that is worshipped, followed, or obeyed other than Allah is Taghut.", "A special terminology for weather changes", "A specific group of individuals who lived before the Prophets"] },
  { id: 35, week: 3, q: "How many Taghut are there, and who are their leaders?", a: "They are many, but their leaders are five.", opts: ["They are many, but their leaders are five.", "Exactly ten with two regional commanders", "There are three distinct entities tracking world timelines", "They are uncountable with no structural leaders listed"] }
];

const ADHKAR_POOL = [
  { id: "adh1", situation: "When I wake up from sleep, I say:", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", translit: "Al-hamdu lillahi ladhi ahyaana ba'da ma amaatanaawa ilayhin-nusuur", meaning: "All praise be to Allah Who revived us to life after giving us death and to Him we shall have to return" },
  { id: "adh2", situation: "When I start to do any work, I say:", arabic: "بِسْمِ اللَّهِ", translit: "Bismillahi", meaning: "In The name of Allah" },
  { id: "adh3", situation: "If I plan anything for doing in the future, I should say:", arabic: "إِنْ شَاءَ اللَّهُ", translit: "Insha'Allah sa'af'alu kadha", meaning: "If Allah wills, I will do so" },
  { id: "adh4", situation: "The greatest thing for me to say is:", arabic: "لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ", translit: "Laa ilaaha illa-Allah Muhammad-ul-Rasuulu", meaning: "None has the right to be worshipped except Allah and Muhammad (SAW) is the Messenger of Allah" },
  { id: "adh5", situation: "When the name of our Prophet Muhammad is mentioned to us, I say:", arabic: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ", translit: "Sall-Allahu 'alaihi wa sallam", meaning: "May peace and Blessings of Allah (SWT) be upon him" },
  { id: "adh6", situation: "And when I go out from home, I say:", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", translit: "Bismillahi tawakkaltu 'alallahi wala haula wala quwwata illa billah", meaning: "In the name of Allah I trust to Allah and there is no strength nor power except with Allah" },
  { id: "adh7", situation: "When I enter my home, I say:", arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا", translit: "Bismillahi walajna wa bismillahi kharajna wa 'ala Rabbina tawakkalna", meaning: "By the name of Allah, I enter and by the name of Allah, I step out and we trust to our Lord" },
  { id: "adh8", situation: "And when anyone favours me with a good, I should say:", arabic: "جَزَاكَ اللَّهُ خَيْرًا", translit: "Jazaak Allahu khairan", meaning: "May Allah give you a better reward" },
  { id: "adh9", situation: "When I see a thing pleasing to me, I say:", arabic: "مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ", translit: "Masha' Allah la quwwata illa billah", meaning: "That which Allah wills, there is no power except with Allah" },
  { id: "adh10", situation: "And when I get up from a meeting, I should say:", arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ", translit: "Subhanak Allahumma wa bihamdika Ash-hadu an la ilaaha illa Anta astaghfiruka wa 'atuba ilaika", meaning: "O Allah! Glory is for You and Praise is for You. I testify that none is to be worshipped except You. I ask Your forgiveness and I return to You" },
  { id: "adh11", situation: "When I sneeze, I say:", arabic: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah", meaning: "All Praise is to Allah" },
  { id: "adh12", situation: "And in reply to a sneeze, one should say:", arabic: "يَرْحَمُكَ اللَّهُ", translit: "Yar hamkallah", meaning: "May Allah bestow His mercy on you" },
  { id: "adh13", situation: "And then (after the reply to a sneeze), I say:", arabic: "يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ", translit: "Yahdikumu Allah wa yuslehu balakum", meaning: "May Allah guide you and set right all your affairs" },
  { id: "adh14", situation: "And when I dine at the table of another person, I say:", arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي", translit: "Allahumma at'im man at'amani wasqi man saqani", meaning: "O Allah! Feed him who fed me and give him drink who gave me drink" },
  { id: "adh15", situation: "At the finishing of my meal, I say:", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", translit: "Alhamdu lillahi-ladhi at'amani hadha wa razaqanihi min ghaeri haulin minni wala quwwatin", meaning: "All praise be to Allah Who fed me this and provided me sustenance without my strength and power" },
  { id: "adh16", situation: "And I should say:", arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَارْزُقْنِي", translit: "Allahummaghfirli warhamni wa afini, warzuqni", meaning: "O Allah! Forgive me and have mercy upon me and keep me healthy and grant me sustenance" },
  { id: "adh17", situation: "And when I break my fast (Iftar time) in Ramadan, I say:", arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ", translit: "Dhahabaz-zama'u wabtal-latil 'urooqu wa thabatal 'ajru insha' Allah", meaning: "Thirst has vanished and veins are moistened and the reward is established, if Allah wills" },
  { id: "adh18", situation: "And when I enter the toilet, I say:", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", translit: "Allahumma inni a'udhu bika minal khubuthi wal khabaith", meaning: "O Allah! I seek refuge with You from the bad and evil Jinns" },
  { id: "adh19", situation: "And when I come out of the toilet, I say:", arabic: "غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي", translit: "Ghufranak Alhamdu lillahi-ladhi adh-haba 'annil adha wa 'afani", meaning: "(I ask) Your forgiveness, All praise is to Allah Who relieved me from the suffering and gave me relief" },
  { id: "adh20", situation: "After hearing the Adhan, and in the Morning and evening, I say:", arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", translit: "Raditu billahi Rabban wa bil-Islami dina wabi Muhammad (SAW) Nabiyai", meaning: "I am pleased with Allah as the Lord and Islam as the religion and Muhammad (SAW) as the Prophet" },
  { id: "adh21", situation: "When I enter the mosque, I say:", arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", translit: "Bismillahi was-salatu was-salamu 'ala Rasulil-Allah Allahummaftah li abwaaba rahmatika", meaning: "In the name of Allah and peace and blessings be upon the Messenger of Allah, O Allah! Open for me the gates of Your mercy" },
  { id: "adh22", situation: "When I step out of the mosque, I say:", arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", translit: "Bismillahi was-salatu was-salamu 'ala Rasulil-Allah Allahumma inni as'aluka min adlika", meaning: "In the name of Allah and peace and blessings be upon the Messenger of Allah, O Allah! I ask You from Your favour" },
  { id: "adh23", situation: "When any affliction occurs to me, I should say:", arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أَجِرْنِي فِي مُصِيبَتِي وَاخْلُفْ لِي خَيْرًا مِنْهَا", translit: "Inna lillahi wa inna ilaehi raji'un Allahumma ajirni fi musibati wa akhlif li khairan minha", meaning: "Truly! To Allah we belong and truly to Him we shall return. O Allah! Compensate me for my hardship and provide me a better substitute of it" },
  { id: "adh24", situation: "When I find anyone in affliction, I say:", arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا", translit: "Alhamdu lillahi ladhi 'afiini mimmab talaka bihi wa faddalani 'ala kathiri mimman khalaqa tafdila", meaning: "All praise be to Allah, Who saved me from that He has afflicted you and favoured me more than many others He created" },
  { id: "adh25", situation: "When I visit a sick person, I say:", arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", translit: "La ba'sa tahurun insha' Allah", meaning: "Never mind, it is a purifier if Allah wills" },
  { id: "adh26", situation: "When I see a Muslim, I say:", arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", translit: "As-Salaamun alaukun wa rahmotullahi wa barakaatuhu", meaning: "Peace be upon you and the mercy of Allah and His Blessings" },
  { id: "adh27", situation: "When I face any enemy, I say:", arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translit: "Hasbun-Allahu wa Ni'm-al-Wakil", meaning: "Allah is sufficient for us and He is the best Disposer of affairs (for us)" },
  { id: "adh28", situation: "When I visit a Muslim graveyard, I should say:", arabic: "السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ", translit: "As-salamu 'alaikum daara qaomim-mu'mineen wa inna insha Allahu bikum laahiqun", meaning: "Peace be upon you, the dwellers among the believing people; and if Allah wills, we are also to join you" },
  { id: "adh29", situation: "At the time of anger, I say:", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", translit: "A'udhu billahi minash-Shaitan-ir-rajim", meaning: "I seek refuge with Allah from the Satan, the cursed one" }
];

export default function App() {
  const [view, setView] = useState('menu'); 
  const [unlockedWeek, setUnlockedWeek] = useState(3);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Quiz states
  const [quizMode, setQuizMode] = useState('all'); 
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  const [weekScores, setWeekScores] = useState({
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 }
  });

  // Adhkar quiz states
  const [adhkarQuizQs, setAdhkarQuizQs] = useState([]);
  const [adhkarCurrent, setAdhkarCurrent] = useState(0);
  const [adhkarScore, setAdhkarScore] = useState(0);
  const [adhkarAnswered, setAdhkarAnswered] = useState(false);
  const [adhkarSelectedIdx, setAdhkarSelectedIdx] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('tawheed_quiz_unlockedWeek');
    if (saved) {
      const val = parseInt(saved, 10);
      if (val < 3) {
        setUnlockedWeek(3);
        localStorage.setItem('tawheed_quiz_unlockedWeek', '3');
      } else {
        setUnlockedWeek(val);
      }
    } else {
      localStorage.setItem('tawheed_quiz_unlockedWeek', '3');
    }
  }, []);

  const startQuizEngine = (mode) => {
    const activeMode = mode || quizMode;
    setQuizMode(activeMode);
    let pool = [];

    if (activeMode === 'all') {
      pool = [...HANDOUT_QUESTIONS];
    } else {
      const targetWk = activeMode === 'week1' ? 1 : activeMode === 'week2' ? 2 : 3;
      pool = HANDOUT_QUESTIONS.filter(q => q.week === targetWk);
    }

    const shuffled = pool.map(q => {
      const correctText = q.a;
      const sortedOpts = q.opts.map(o => o);
      const correctIdx = sortedOpts.indexOf(correctText);
      return {
        week: q.week,
        q: q.q,
        options: sortedOpts,
        correct: correctIdx !== -1 ? correctIdx : 0,
        note: q.a
      };
    }).sort(() => 0.5 - Math.random()).slice(0, activeMode === 'all' ? 25 : 10);

    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedOptIdx(null);
    setView('quiz');
  };

  const selectOption = (idx) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptIdx(idx);
    
    const q = questions[current];
    const isCorrect = idx === q.correct;

    setWeekScores(prev => ({
      ...prev,
      [q.week]: {
        total: prev[q.week].total + 1,
        correct: isCorrect ? prev[q.week].correct + 1 : prev[q.week].correct
      }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedOptIdx(null);

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
    } else {
      const pct = (score / questions.length) * 100;
      if (pct >= 70) {
        if (quizMode === 'week1' && unlockedWeek === 1) {
          setUnlockedWeek(2);
          localStorage.setItem('tawheed_quiz_unlockedWeek', '2');
        }
        if (quizMode === 'week2' && unlockedWeek === 2) {
          setUnlockedWeek(3);
          localStorage.setItem('tawheed_quiz_unlockedWeek', '3');
        }
      }
      setView('results');
    }
  };

  const startAdhkarQuiz = () => {
    const picked = [...ADHKAR_POOL].sort(() => 0.5 - Math.random()).slice(0, 10);
    const types = ['situation', 'meaning', 'translit'];
    const built = picked.map(item => {
      const type = types[Math.floor(Math.random() * types.length)];
      const wrongPool = ADHKAR_POOL.filter(a => a.id !== item.id);
      const wrongPicks = wrongPool.sort(() => 0.5 - Math.random()).slice(0, 3);

      if (type === 'situation') {
        // Show Arabic + transliteration, ask "When do you say this?"
        const opts = [item.situation, ...wrongPicks.map(w => w.situation)].sort(() => 0.5 - Math.random());
        return { type, prompt: 'When do you say this?', arabic: item.arabic, translit: item.translit, situation: null, meaning: null, correctAnswer: item.situation, options: opts, correct: opts.indexOf(item.situation) };
      } else if (type === 'meaning') {
        // Show situation + Arabic, ask "What is the meaning?"
        const opts = [item.meaning, ...wrongPicks.map(w => w.meaning)].sort(() => 0.5 - Math.random());
        return { type, prompt: 'What is the meaning?', arabic: item.arabic, translit: item.translit, situation: item.situation, meaning: null, correctAnswer: item.meaning, options: opts, correct: opts.indexOf(item.meaning) };
      } else {
        // Show situation + meaning, ask "What do you say?" (transliteration)
        const opts = [item.translit, ...wrongPicks.map(w => w.translit)].sort(() => 0.5 - Math.random());
        return { type, prompt: 'What do you say?', arabic: item.arabic, translit: null, situation: item.situation, meaning: item.meaning, correctAnswer: item.translit, options: opts, correct: opts.indexOf(item.translit) };
      }
    });
    setAdhkarQuizQs(built);
    setAdhkarCurrent(0);
    setAdhkarScore(0);
    setAdhkarAnswered(false);
    setAdhkarSelectedIdx(null);
    setView('adhkar_quiz');
  };

  const selectAdhkarOption = (idx) => {
    if (adhkarAnswered) return;
    setAdhkarAnswered(true);
    setAdhkarSelectedIdx(idx);
    if (idx === adhkarQuizQs[adhkarCurrent].correct) {
      setAdhkarScore(prev => prev + 1);
    }
  };

  const nextAdhkarQuestion = () => {
    setAdhkarAnswered(false);
    setAdhkarSelectedIdx(null);
    if (adhkarCurrent + 1 < adhkarQuizQs.length) {
      setAdhkarCurrent(prev => prev + 1);
    } else {
      setView('adhkar_results');
    }
  };

  return (
    <div style={{
      boxSizing: 'border-box', minHeight: '100vh', background: 'linear-gradient(160deg, #0E3B32, #0A2C25 70%)',
      fontFamily: "'Inter', sans-serif", color: '#FBF7EC', display: 'flex', justifyContent: 'center', padding: '2.5rem 1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '720px' }}>
        
        {/* ==========================================
            VIEW: HOME SELECTION MENU
            ========================================== */}
        {view === 'menu' && (
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{ color: '#F0C24B', fontSize: '1.3rem', letterSpacing: '0.5rem', marginBottom: '0.8rem' }}>✦ ✧ ✦</div>
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '2.4rem', color: '#F0C24B', fontWeight: 800 }}>TAWHEED &amp; ADHKAR QUIZ</h1>
            <p style={{ color: '#BFDBD1', marginTop: '0.6rem', fontSize: '1.05rem' }}>3 Weeks Course &middot; Straight-forward Multiple Choice Questions</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
              <button onClick={() => { setSelectedWeek(1); setView('learn'); }} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1rem', background: '#7BE0BE', color: '#0A2C25', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '999px', cursor: 'pointer'
              }}>
                📖 Learn Tawheed 
              </button>
              <button onClick={() => setView('learn_adhkar')} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1rem', background: '#7BE0BE', color: '#0A2C25', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '999px', cursor: 'pointer'
              }}>
                🕌 Learn Daily Adhkar
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0', flexWrap: 'wrap' }}>
              <div style={{ background: '#124A3F', borderRadius: '999px', padding: '0.6rem 1.2rem', fontSize: '0.9rem', color: '#7BE0BE' }}>Week 1: Knowing Allah &amp; Iman</div>
              <div style={{ background: '#124A3F', borderRadius: '999px', padding: '0.6rem 1.2rem', fontSize: '0.9rem', color: '#7BE0BE' }}>Week 2: Tawheed in Depth &amp; Shirk</div>
              <div style={{ background: '#124A3F', borderRadius: '999px', padding: '0.6rem 1.2rem', fontSize: '0.9rem', color: '#7BE0BE' }}>Week 3: Kufr, Hypocrisy &amp; Actions</div>
            </div>

            <div style={{ background: '#124A3F', borderRadius: '16px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Baloo 2', sans-serif", color: '#F0C24B', marginBottom: '1rem', fontSize: '1.25rem' }}>Weekly Progress</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[1, 2, 3].map(wk => {
                  const locked = wk > unlockedWeek;
                  return (
                    <div key={wk} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: '#155B4D', borderRadius: '12px', opacity: locked ? 0.45 : 1 }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: '#7BE0BE', fontWeight: 600 }}>WEEK 0{wk}</span>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>{wk === 1 ? 'Knowing Allah & Iman' : wk === 2 ? 'Tawheed in Depth & Shirk' : 'Kufr, Hypocrisy & Living It Out'}</p>
                      </div>
                      <button disabled={locked} onClick={() => startQuizEngine(`week${wk}`)} style={{
                        background: locked ? '#0E3B32' : '#F0C24B', color: locked ? '#BFDBD1' : '#1A1A1A', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', cursor: locked ? 'default' : 'pointer'
                      }}>
                        {locked ? '🔒 Locked' : 'Start Quiz'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={() => startQuizEngine('all')} style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.5px',
              background: '#F0C24B', color: '#1A1A1A', border: 'none', padding: '0.9rem 2.2rem', borderRadius: '999px',
              cursor: 'pointer', transition: 'transform 0.15s ease'
            }}>Start Full Quiz →</button>
          </div>
        )}

        {/* ==========================================
            VIEW: TEXTBOOK TAWHEED VISUALIZER
            ========================================== */}
        {view === 'learn' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <button onClick={() => setView('menu')} style={{ color: '#7BE0BE', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>← Back to Menu</button>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[1, 2, 3].map(w => (
                  <button key={w} onClick={() => setSelectedWeek(w)} style={{
                    padding: '0.4rem 0.8rem', background: selectedWeek === w ? '#F0C24B' : '#124A3F', color: selectedWeek === w ? '#1A1A1A' : '#FBF7EC', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer'
                  }}>Wk {w}</button>
                ))}
              </div>
            </div>

            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: '#F0C24B', fontSize: '1.8rem', marginBottom: '1rem' }}>{selectedWeek === 1 ? 'Week 1 — Knowing Allah & Iman' : selectedWeek === 2 ? 'Week 2 — Tawheed in Depth & Shirk' : 'Week 3 — Kufr, Hypocrisy & Living It Out'}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {Object.entries(CURRICULUM_DATA[selectedWeek].sessions).map(([id, s]) => (
                <div key={id} style={{ background: '#124A3F', borderRadius: '12px', padding: '0.5rem 1rem' }}>
                  <div onClick={() => setSelectedSession(selectedSession === id ? null : id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', padding: '0.5rem 0' }}>
                    <span style={{ color: '#7BE0BE', fontSize: '0.95rem' }}>{s.title}</span>
                    <span>{selectedSession === id ? '▲' : '▼'}</span>
                  </div>
                  {selectedSession === id && (
                    <div style={{ marginTop: '0.5rem', borderTop: '1px solid #155B4D', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {HANDOUT_QUESTIONS.filter(item => s.sourceQ.includes(item.id)).map(node => (
                        <div key={node.id} style={{ borderLeft: '3px solid #F0C24B', paddingLeft: '0.6rem' }}>
                          <p style={{ margin: '0 0 0.2rem 0', fontWeight: 'bold', fontSize: '0.9rem', color: '#7BE0BE' }}>Q{node.id}. {node.q}</p>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#FBF7EC', whiteSpace: 'pre-line' }}>{node.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: LEARN ADHKAR REFERENCE SECTION[cite: 1]
            ========================================== */}
        {view === 'learn_adhkar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => setView('menu')} style={{ color: '#7BE0BE', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>← Back to Menu</button>
              <button onClick={startAdhkarQuiz} style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '0.9rem', background: '#F0C24B', color: '#1A1A1A', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '999px', cursor: 'pointer' }}>
                Start Adhkar Quiz
              </button>
            </div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: '#F0C24B', fontSize: '1.8rem', margin: 0 }}>🕌 Adhkar Study Guide</h2>
            
            {ADHKAR_POOL.map((item) => (
              <div key={item.id} style={{ background: '#124A3F', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <span style={{ color: '#7BE0BE', fontSize: '0.85rem', fontWeight: 'bold' }}>{item.situation}</span>
                <p style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: '1.5rem', color: '#F0C24B', margin: 0, textAlign: 'right', lineHeight: 2 }} dir="rtl">{item.arabic}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#FBF7EC', fontStyle: 'italic' }}>{item.translit}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#BFDBD1' }}>{item.meaning}</p>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: QUIZ SCREEN TERMINAL
            ========================================== */}
        {view === 'quiz' && (
          <div>
            {/* Control bar with navigation helpers */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
              <button onClick={() => setView('results')} style={{ background: 'none', border: 'none', color: '#E2685A', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                End Quiz
              </button>
              <div style={{ flex: 1, height: '10px', background: '#124A3F', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #7BE0BE, #F0C24B)', width: `${((current) / questions.length) * 100}%`, transition: 'width 0.3s ease' }}></div>
              </div>
              <button onClick={() => startQuizEngine(quizMode)} style={{ background: 'none', border: 'none', color: '#7BE0BE', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.4rem' }} title="Restart quiz">
                ⟳
              </button>
              <div style={{ background: '#124A3F', color: '#F0C24B', fontWeight: 700, padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Score: {score}</div>
            </div>
            
            <div style={{ color: '#7BE0BE', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
              {questions[current]?.week === 1 ? 'Week 1 — Knowing Allah & Iman' : questions[current]?.week === 2 ? 'Week 2 — Tawheed in Depth & Shirk' : 'Week 3 — Kufr, Hypocrisy & Living It Out'}
            </div>
            <div style={{ color: '#BFDBD1', fontSize: '0.85rem', marginBottom: '1.2rem' }}>Question {current + 1} of {questions.length}</div>

            <div style={{ background: '#124A3F', borderRadius: '16px', padding: '1.6rem' }}>
              <h2 style={{ fontSize: '1.3rem', lineHeight: 1.4, fontWeight: 700, color: '#FBF7EC' }}>{questions[current]?.q}</h2>
              
              <div style={{ marginTop: '1.3rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {questions[current]?.options.map((opt, idx) => {
                  let borderStyle = '2px solid transparent';
                  let bgStyle = '#155B4D';
                  
                  if (answered) {
                    if (idx === questions[current].correct) {
                      bgStyle = 'rgba(95,203,140,0.25)';
                      borderStyle = '2px solid #5FCB8C';
                    } else if (idx === selectedOptIdx) {
                      bgStyle = 'rgba(226,104,90,0.25)';
                      borderStyle = '2px solid #E2685A';
                    }
                  }

                  return (
                    <button key={idx} disabled={answered} onClick={() => selectOption(idx)} style={{
                      textAlign: 'left', background: bgStyle, border: borderStyle, color: '#FBF7EC',
                      padding: '0.8rem 1rem', borderRadius: '12px', fontSize: '1rem', cursor: answered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div style={{
                  marginTop: '1rem', padding: '0.9rem 1.1rem', borderRadius: '12px', fontSize: '0.92rem',
                  background: selectedOptIdx === questions[current].correct ? 'rgba(95,203,140,0.15)' : 'rgba(226,104,90,0.25)',
                  color: selectedOptIdx === questions[current].correct ? '#5FCB8C' : '#E2685A'
                }}>
                  {selectedOptIdx === questions[current].correct 
                    ? 'Correct! ✓' 
                    : `Not quite — the answer is: `}
                  {!(selectedOptIdx === questions[current].correct) && <strong style={{ color: '#FBF7EC' }}>{questions[current].options[questions[current].correct]}</strong>}
                </div>
              )}

              <div style={{ color: '#F0C24B', fontSize: '0.85rem', marginTop: '0.5rem', minHeight: '1.2em' }}>
                {streak >= 2 ? `🔥 ${streak} in a row!` : ''}
              </div>

              {answered && (
                <div style={{ textAlign: 'right', marginTop: '1.3rem' }}>
                  <button onClick={nextQuestion} style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, background: '#7BE0BE', color: '#0A2C25', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '999px', cursor: 'pointer' }}>
                    {current + 1 === questions.length ? 'Show Results →' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: PERFORMANCE METRICS OUTCOME
            ========================================== */}
        {view === 'results' && (
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>{(score / questions.length) >= 0.7 ? '🏆' : '📖'}</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '1.8rem', color: '#F0C24B', marginTop: '0.6rem' }}>Your Results</h2>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#FBF7EC', margin: '0.6rem 0', fontFamily: "'Baloo 2', sans-serif" }}>
              {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </div>
            
            <p style={{ color: '#BFDBD1', maxWidth: '30rem', margin: '0.6rem auto 1.6rem' }}>
              {(score / questions.length) >= 0.7 
                ? "Mashallah! Excellent score. Keep it up!"
                : "You didn't pass this time. Please review the material and try again."}
            </p>

            <button onClick={() => setView('menu')} style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1.1rem', background: '#F0C24B', color: '#1A1A1A', border: 'none', padding: '0.9rem 2.2rem', borderRadius: '999px', cursor: 'pointer'
            }}>Return to Menu</button>
          </div>
        )}

        {/* ==========================================
            VIEW: ADHKAR QUIZ
            ========================================== */}
        {view === 'adhkar_quiz' && adhkarQuizQs.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
              <button onClick={() => setView('adhkar_results')} style={{ background: 'none', border: 'none', color: '#E2685A', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                End Quiz
              </button>
              <div style={{ flex: 1, height: '10px', background: '#124A3F', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #7BE0BE, #F0C24B)', width: `${((adhkarCurrent) / adhkarQuizQs.length) * 100}%`, transition: 'width 0.3s ease' }}></div>
              </div>
              <div style={{ background: '#124A3F', color: '#F0C24B', fontWeight: 700, padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Score: {adhkarScore}</div>
            </div>

            <div style={{ color: '#BFDBD1', fontSize: '0.85rem', marginBottom: '1.2rem' }}>Question {adhkarCurrent + 1} of {adhkarQuizQs.length}</div>

            <div style={{ background: '#124A3F', borderRadius: '16px', padding: '1.6rem' }}>
              {/* Show situation when available (meaning & translit types) */}
              {adhkarQuizQs[adhkarCurrent].situation && (
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ color: '#7BE0BE', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Situation</span>
                  <h2 style={{ fontSize: '1.15rem', lineHeight: 1.4, fontWeight: 700, color: '#FBF7EC', margin: '0.3rem 0 0 0' }}>{adhkarQuizQs[adhkarCurrent].situation}</h2>
                </div>
              )}

              {/* Show Arabic + transliteration when available (situation & meaning types) */}
              {adhkarQuizQs[adhkarCurrent].arabic && (
                <div style={{ background: '#0E3B32', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.2rem' }}>
                  <p style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: '1.4rem', color: '#F0C24B', margin: '0 0 0.4rem 0', lineHeight: 1.8 }} dir="rtl">
                    {adhkarQuizQs[adhkarCurrent].arabic}
                  </p>
                  {adhkarQuizQs[adhkarCurrent].translit && (
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#BFDBD1', fontStyle: 'italic' }}>({adhkarQuizQs[adhkarCurrent].translit})</p>
                  )}
                </div>
              )}

              {/* Show meaning when available (translit type) */}
              {adhkarQuizQs[adhkarCurrent].meaning && (
                <div style={{ background: '#0E3B32', padding: '1rem', borderRadius: '12px', marginBottom: '1.2rem' }}>
                  <span style={{ color: '#7BE0BE', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Meaning</span>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '1rem', color: '#FBF7EC' }}>{adhkarQuizQs[adhkarCurrent].meaning}</p>
                </div>
              )}

              <p style={{ color: '#7BE0BE', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.6rem' }}>{adhkarQuizQs[adhkarCurrent].prompt}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {adhkarQuizQs[adhkarCurrent].options.map((opt, idx) => {
                  let borderStyle = '2px solid transparent';
                  let bgStyle = '#155B4D';

                  if (adhkarAnswered) {
                    if (idx === adhkarQuizQs[adhkarCurrent].correct) {
                      bgStyle = 'rgba(95,203,140,0.25)';
                      borderStyle = '2px solid #5FCB8C';
                    } else if (idx === adhkarSelectedIdx) {
                      bgStyle = 'rgba(226,104,90,0.25)';
                      borderStyle = '2px solid #E2685A';
                    }
                  }

                  return (
                    <button key={idx} disabled={adhkarAnswered} onClick={() => selectAdhkarOption(idx)} style={{
                      textAlign: 'left', background: bgStyle, border: borderStyle, color: '#FBF7EC',
                      padding: '0.8rem 1rem', borderRadius: '12px', fontSize: '0.95rem', cursor: adhkarAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {adhkarAnswered && (
                <div style={{
                  marginTop: '1rem', padding: '0.9rem 1.1rem', borderRadius: '12px', fontSize: '0.92rem',
                  background: adhkarSelectedIdx === adhkarQuizQs[adhkarCurrent].correct ? 'rgba(95,203,140,0.15)' : 'rgba(226,104,90,0.25)',
                  color: adhkarSelectedIdx === adhkarQuizQs[adhkarCurrent].correct ? '#5FCB8C' : '#E2685A'
                }}>
                  {adhkarSelectedIdx === adhkarQuizQs[adhkarCurrent].correct
                    ? 'Correct! ✓'
                    : 'Not quite — the correct answer is: '}
                  {adhkarSelectedIdx !== adhkarQuizQs[adhkarCurrent].correct && <strong style={{ color: '#FBF7EC' }}>{adhkarQuizQs[adhkarCurrent].correctAnswer}</strong>}
                </div>
              )}

              {adhkarAnswered && (
                <div style={{ textAlign: 'right', marginTop: '1.3rem' }}>
                  <button onClick={nextAdhkarQuestion} style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, background: '#7BE0BE', color: '#0A2C25', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '999px', cursor: 'pointer' }}>
                    {adhkarCurrent + 1 === adhkarQuizQs.length ? 'Show Results →' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: ADHKAR QUIZ RESULTS
            ========================================== */}
        {view === 'adhkar_results' && (
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>{(adhkarScore / adhkarQuizQs.length) >= 0.7 ? '🏆' : '📖'}</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: '1.8rem', color: '#F0C24B', marginTop: '0.6rem' }}>Adhkar Quiz Results</h2>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#FBF7EC', margin: '0.6rem 0', fontFamily: "'Baloo 2', sans-serif" }}>
              {adhkarScore} / {adhkarQuizQs.length} ({Math.round((adhkarScore / adhkarQuizQs.length) * 100)}%)
            </div>

            <p style={{ color: '#BFDBD1', maxWidth: '30rem', margin: '0.6rem auto 1.6rem' }}>
              {(adhkarScore / adhkarQuizQs.length) >= 0.7
                ? "Mashallah! You know your daily adhkar well. Keep it up!"
                : "Keep studying the adhkar and try again. You'll get there!"}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={startAdhkarQuiz} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1rem', background: '#7BE0BE', color: '#0A2C25', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '999px', cursor: 'pointer'
              }}>Try Again</button>
              <button onClick={() => setView('learn_adhkar')} style={{
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: '1rem', background: '#F0C24B', color: '#1A1A1A', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '999px', cursor: 'pointer'
              }}>Back to Study Guide</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

