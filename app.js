/**
 * Aria - Multilingual Companion & Advanced Spelling Engine
 * Comprehensive spell checker for English, Hinglish, and Marathi-English
 * Uses curated dictionaries, phonetic rules, and Levenshtein fuzzy matching
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. Direct Phonetic & Common Typo Overrides
  // =========================================================================

  const COMMON_EXPLICIT_TYPOS = {
    // English explicit common traps
    'speeling': { correct: 'spelling', tip: "English tip: 'spelling' has double 'll'." },
    'auctual': { correct: 'actual', tip: "English tip: 'actual' has no 'u' before 'c'." },
    'aver': { correct: 'ever', tip: "English tip: Did you mean 'ever' or 'whatever'?" },
    'watever': { correct: 'whatever', tip: "English tip: Spelled 'whatever' with 'wh'." },
    'girlfrien': { correct: 'girlfriend', tip: "English tip: Don't miss the 'd' at the end of 'girlfriend'." },
    'taik': { correct: 'talk', tip: "English tip: Written 'talk' (t-a-l-k), not 'taik'." },
    'ans': { correct: 'and', tip: "English tip: Did you mean 'and' or 'answer'?" },
    'recieve': { correct: 'receive', tip: "English rule: 'i' before 'e' except after 'c' ('receive')." },
    'recieved': { correct: 'received', tip: "English rule: 'e' before 'i' in 'received'." },
    'seperate': { correct: 'separate', tip: "English tip: Remember 'a rat' in 'sep-a-rate'!" },
    'definately': { correct: 'definitely', tip: "English tip: Written 'definitely' with an 'i'." },
    'untill': { correct: 'until', tip: "English tip: 'until' has only one 'l'." },
    'collge': { correct: 'college', tip: "English tip: Written 'college' with an 'e'." },
    'keyes': { correct: 'keys', tip: "English tip: Plural of key is 'keys'." },
    'beautifull': { correct: 'beautiful', tip: "English tip: 'beautiful' ends with a single 'l'." },
    'beutiful': { correct: 'beautiful', tip: "English tip: Written 'beautiful' (b-e-a-u-t-i-f-u-l)." },
    'tommorow': { correct: 'tomorrow', tip: "English tip: One 'm' and double 'r': 'tomorrow'." },
    'tomorow': { correct: 'tomorrow', tip: "English tip: Written 'tomorrow' with double 'r'." },
    'tommorrow': { correct: 'tomorrow', tip: "English tip: One 'm' and double 'r': 'tomorrow'." },
    'wich': { correct: 'which', tip: "English tip: Written with 'wh': 'which'." },
    'thier': { correct: 'their', tip: "English tip: Written 'their' (t-h-e-i-r)." },
    'beleive': { correct: 'believe', tip: "English tip: 'i' before 'e' in 'believe'." },
    'favrite': { correct: 'favorite', tip: "English tip: Written 'favorite' (or British 'favourite')." },
    'alot': { correct: 'a lot', tip: "English tip: 'a lot' is always two separate words." },
    'hapyy': { correct: 'happy', tip: "English tip: Double 'p', single 'y': 'happy'." },
    'thnks': { correct: 'thanks', tip: "English tip: Full spelling is 'thanks'." },
    'thnx': { correct: 'thanks', tip: "English tip: Full spelling is 'thanks'." },
    'plz': { correct: 'please', tip: "English tip: Proper spelling is 'please'." },
    'pls': { correct: 'please', tip: "English tip: Proper spelling is 'please'." },
    'plzz': { correct: 'please', tip: "English tip: Proper spelling is 'please'." },
    'bcoz': { correct: 'because', tip: "English tip: Full spelling is 'because'." },
    'becoz': { correct: 'because', tip: "English tip: Full spelling is 'because'." },
    'hve': { correct: 'have', tip: "English tip: Written 'have'." },
    'gud': { correct: 'good', tip: "English tip: Written 'good' (g-o-o-d)." },
    'luv': { correct: 'love', tip: "English tip: Written 'love' (l-o-v-e)." },
    'freind': { correct: 'friend', tip: "English tip: 'i' before 'e' in 'friend'." },
    'writting': { correct: 'writing', tip: "English tip: 'writing' has only one 't'." },
    'grammer': { correct: 'grammar', tip: "English tip: 'grammar' ends in '-ar'." },
    'misteak': { correct: 'mistake', tip: "English tip: Spelled 'mistake' (m-i-s-t-a-k-e)." },
    'dident': { correct: "didn't", tip: "English tip: Written 'didn't' or 'did not'." },
    'dont': { correct: "don't", tip: "English tip: Written 'don't' with an apostrophe." },
    'cant': { correct: "can't", tip: "English tip: Written 'can't' with an apostrophe." },
    'teh': { correct: 'the', tip: "English tip: Common typo for 'the'." },
    'waht': { correct: 'what', tip: "English tip: Common typo for 'what'." },
    'wht': { correct: 'what', tip: "English tip: Full word is 'what'." },
    'hw': { correct: 'how', tip: "English tip: Full word is 'how'." },

    // Hinglish explicit common traps
    'muje': { correct: 'mujhe', tip: "Hinglish tip: The soft Hindi sound 'झ/ह' needs an 'h'. Write 'mujhe' instead of 'muje'." },
    'tuje': { correct: 'tujhe', tip: "Hinglish tip: Write 'tujhe' with an 'h' for natural pronunciation." },
    'kese': { correct: 'kaise', tip: "Hinglish tip: 'kaise' (how) is standard over 'kese'." },
    'wese': { correct: 'waise', tip: "Hinglish tip: Standard spelling is 'waise'." },
    'jese': { correct: 'jaise', tip: "Hinglish tip: Standard spelling is 'jaise'." },
    'bhot': { correct: 'bohot', tip: "Hinglish tip: Standard Roman Hindi is 'bohot' or 'bahut'." },
    'bht': { correct: 'bohot', tip: "Hinglish tip: Expand 'bht' to 'bohot' or 'bahut'." },
    'smjh': { correct: 'samajh', tip: "Hinglish tip: Add vowels to write 'samajh' (understand)." },
    'smjha': { correct: 'samjha', tip: "Hinglish tip: Full spelling is 'samjha'." },
    'smjhi': { correct: 'samjhi', tip: "Hinglish tip: Full spelling is 'samjhi'." },
    'kr': { correct: 'kar', tip: "Hinglish tip: Expand SMS shorthand 'kr' to 'kar'." },
    'rha': { correct: 'raha', tip: "Hinglish tip: Write full word 'raha' instead of 'rha'." },
    'rhi': { correct: 'rahi', tip: "Hinglish tip: Write full word 'rahi' instead of 'rhi'." },
    'rhe': { correct: 'rahe', tip: "Hinglish tip: Write full word 'rahe' instead of 'rhe'." },
    'acha': { correct: 'achha', tip: "Hinglish tip: 'achha' (अच्छा) uses 'chh' for aspirated sound." },
    'shyd': { correct: 'shayad', tip: "Hinglish tip: Full spelling is 'shayad' (maybe)." },
    'zroor': { correct: 'zaroor', tip: "Hinglish tip: Full spelling is 'zaroor' (definitely)." },
    'kbhi': { correct: 'kabhi', tip: "Hinglish tip: Include the first vowel: 'kabhi'." },
    'btana': { correct: 'batana', tip: "Hinglish tip: Full spelling is 'batana' (to tell)." },
    'btao': { correct: 'batao', tip: "Hinglish tip: Full spelling is 'batao' (tell me)." },
    'thk': { correct: 'theek', tip: "Hinglish tip: Full spelling is 'theek' (fine/good)." },
    'thik': { correct: 'theek', tip: "Hinglish tip: 'theek' with double 'ee' gives proper Hindi sound." },
    'hn': { correct: 'haan', tip: "Hinglish tip: Use 'haan' for yes instead of 'hn'." },
    'pyar': { correct: 'pyaar', tip: "Hinglish tip: 'pyaar' with double 'aa' is preferred for love." },
    'khana': { correct: 'khaana', tip: "Hinglish tip: 'khaana' with double 'aa' means food." },
    'chaiye': { correct: 'chahiye', tip: "Hinglish tip: Remember the 'h': 'chahiye'." },
    'gya': { correct: 'gaya', tip: "Hinglish tip: Expand 'gya' to 'gaya'." },
    'gyi': { correct: 'gayi', tip: "Hinglish tip: Expand 'gyi' to 'gayi'." },
    'gye': { correct: 'gaye', tip: "Hinglish tip: Expand 'gye' to 'gaye'." },
    'kyu': { correct: 'kyun', tip: "Hinglish tip: 'kyun' captures the nasal sound (क्यों)." },
    'hmsha': { correct: 'hamesha', tip: "Hinglish tip: Full spelling is 'hamesha' (always)." },
    'kch': { correct: 'kuch', tip: "Hinglish tip: Full spelling is 'kuch' (something)." },
    'yr': { correct: 'yaar', tip: "Hinglish tip: Full word is 'yaar' (friend/buddy)." },

    // Marathi-English explicit common traps
    'zevan': { correct: 'jevan', tip: "Marathi tip: Use 'j' instead of 'z': 'jevan' (जेवण)." },
    'zal': { correct: 'jhala', tip: "Marathi tip: Use 'jhala' (झाला/झालं)." },
    'zala': { correct: 'jhala', tip: "Marathi tip: Use 'jhala' with 'jh'." },
    'athvan': { correct: 'aathvan', tip: "Marathi tip: Write with double 'aa': 'aathvan' (आठवण)." },
    'atvan': { correct: 'aathvan', tip: "Marathi tip: Write with double 'aa' and 'th': 'aathvan'." },
    'lavkr': { correct: 'lavkar', tip: "Marathi tip: Full spelling is 'lavkar' (लवकर - quickly)." },
    'kute': { correct: 'kuthe', tip: "Marathi tip: Don't forget 'th': 'kuthe' (कुठे - where)." },
    'bhetuya': { correct: 'bhetu ya', tip: "Marathi tip: Separated into two words: 'bhetu ya' (let's meet)." },
    'kharach': { correct: 'kharach', tip: "Marathi tip: 'kharach' (खरंच - really) is standard." },
    'khrach': { correct: 'kharach', tip: "Marathi tip: Full spelling is 'kharach'." },
    'aawadla': { correct: 'aavadla', tip: "Marathi tip: 'aavadla' (आवडला - liked) with 'v'." },
    'awadla': { correct: 'aavadla', tip: "Marathi tip: 'aavadla' with double 'aa'." },
    'majha': { correct: 'majha', tip: "Marathi tip: 'majha' (माझा - mine) with 'j'." },
    'tujha': { correct: 'tujha', tip: "Marathi tip: 'tujha' (तुझा - yours) with 'j'." },
    'bhuk': { correct: 'bhook', tip: "Marathi tip: 'bhook' (भूक - hunger) with double 'oo'." },
    'barobr': { correct: 'barobar', tip: "Marathi tip: Full spelling is 'barobar' (बरोबर)." },
    'ata': { correct: 'aata', tip: "Marathi tip: Use double 'aa': 'aata' (आता - now)." },
    'nko': { correct: 'nako', tip: "Marathi tip: Full spelling is 'nako' (नको)." },
    'pn': { correct: 'pan', tip: "Marathi tip: Full spelling is 'pan' (पण)." }
  };

  // Multi-word phrase traps
  const PHRASE_TYPOS = [
    { pattern: /\bkasa ahe\b/gi, wrong: 'kasa ahe', correct: 'kasa ahes', tip: "Marathi rule: Addressing someone directly in 2nd person takes 'ahes'. Say 'kasa ahes' (for guys) or 'kashi ahes' (for girls).", lang: 'marathi' },
    { pattern: /\bkashi ahe\b/gi, wrong: 'kashi ahe', correct: 'kashi ahes', tip: "Marathi rule: Addressing a girl directly takes 'ahes': 'kashi ahes'.", lang: 'marathi' },
    { pattern: /\bkay chalalay\b/gi, wrong: 'kay chalalay', correct: 'kay chaallay', tip: "Marathi tip: Natural conversational Roman Marathi is spelled 'kay chaallay'.", lang: 'marathi' },
    { pattern: /\bkay chalay\b/gi, wrong: 'kay chalay', correct: 'kay chaallay', tip: "Marathi tip: Standard conversational Roman Marathi is 'kay chaallay'.", lang: 'marathi' },
    { pattern: /\bzevan zal ka\b/gi, wrong: 'zevan zal ka', correct: 'jevan jhala ka', tip: "Marathi tip: Standard Roman Marathi uses 'j' and 'jh': 'jevan jhala ka'.", lang: 'marathi' },
    { pattern: /\bjevan jhal ka\b/gi, wrong: 'jevan jhal ka', correct: 'jevan jhala ka', tip: "Marathi tip: Standard Roman Marathi is 'jevan jhala ka'.", lang: 'marathi' },
    { pattern: /\btula athvan yetey\b/gi, wrong: 'tula athvan yetey', correct: 'tula aathvan yete ka', tip: "Marathi tip: Write 'aathvan' (double a) and 'yete ka' for asking if you miss someone.", lang: 'marathi' },
    { pattern: /\bkya kr rha\b/gi, wrong: 'kya kr rha', correct: 'kya kar raha', tip: "Hinglish tip: Expand shorthand: write 'kya kar raha'.", lang: 'hinglish' },
    { pattern: /\bkya kr rhi\b/gi, wrong: 'kya kr rhi', correct: 'kya kar rahi', tip: "Hinglish tip: Expand shorthand: write 'kya kar rahi'.", lang: 'hinglish' },
    { pattern: /\bkya kr rhe\b/gi, wrong: 'kya kr rhe', correct: 'kya kar rahe', tip: "Hinglish tip: Expand shorthand: write 'kya kar rahe'.", lang: 'hinglish' },
    { pattern: /\bwhat aver\b/gi, wrong: 'what aver', correct: 'whatever', tip: "English tip: 'whatever' is written as a single word.", lang: 'en' }
  ];

  // =========================================================================
  // 2. High-Frequency English & Roman Vocabulary (For Levenshtein Spell Check)
  // =========================================================================

  const VALID_ENGLISH_WORDS = new Set([
    "a", "about", "above", "across", "act", "actual", "actually", "add", "after", "again", "against", "age",
    "ago", "agree", "air", "all", "almost", "alone", "along", "already", "also", "always", "am", "among",
    "an", "and", "animal", "another", "answer", "any", "anything", "appear", "are", "area", "arms", "around",
    "as", "ask", "asked", "asking", "at", "away", "baby", "back", "bad", "ball", "base", "be", "beautiful",
    "became", "because", "become", "bed", "been", "before", "began", "begin", "behind", "believe", "best",
    "better", "between", "big", "black", "blue", "body", "book", "both", "boy", "bring", "brought", "build",
    "built", "busy", "but", "by", "call", "called", "came", "can", "cannot", "car", "care", "carry", "case",
    "cause", "center", "certain", "change", "chat", "chatting", "check", "children", "city", "class", "clear",
    "close", "cold", "college", "come", "coming", "common", "complete", "could", "country", "course", "cute",
    "cut", "dark", "day", "days", "dead", "deal", "dear", "death", "decide", "deep", "did", "didn't", "differ",
    "different", "dinner", "direct", "do", "does", "doesn't", "dog", "doing", "done", "don't", "door", "down",
    "draw", "drive", "dry", "during", "each", "early", "earth", "ease", "east", "easy", "eat", "eating",
    "effort", "either", "else", "end", "english", "enough", "even", "evening", "ever", "every", "everyone",
    "everything", "example", "explain", "eye", "eyes", "face", "fact", "fall", "family", "far", "fast", "father",
    "favorite", "feel", "feeling", "feet", "few", "field", "fight", "figure", "fill", "final", "finally", "find",
    "fine", "fire", "first", "fish", "five", "fly", "follow", "food", "for", "force", "form", "found", "four",
    "free", "friend", "friends", "from", "front", "full", "fun", "game", "gave", "get", "getting", "girl",
    "girlfriend", "give", "given", "giving", "glass", "go", "going", "gone", "good", "got", "great", "green",
    "ground", "group", "grow", "guess", "guy", "had", "half", "hand", "hands", "happen", "happened", "happy",
    "hard", "has", "have", "having", "he", "head", "hear", "heard", "heart", "heat", "heavy", "held", "help",
    "her", "here", "high", "him", "himself", "his", "hold", "home", "hope", "horse", "hot", "hour", "hours",
    "house", "how", "however", "huge", "human", "hundred", "i", "idea", "if", "important", "in", "inch",
    "include", "inside", "instead", "interest", "interesting", "into", "is", "island", "issue", "it", "its",
    "job", "just", "keep", "kept", "key", "keys", "kind", "knew", "know", "known", "land", "large", "last",
    "late", "later", "laugh", "lay", "lead", "learn", "learning", "leave", "left", "less", "let", "letter",
    "life", "light", "like", "liked", "line", "list", "listen", "little", "live", "lived", "living", "long",
    "look", "looked", "looking", "love", "loved", "loving", "low", "lunch", "made", "main", "make", "making",
    "man", "many", "map", "mark", "matter", "may", "maybe", "me", "mean", "meet", "meeting", "men", "message",
    "might", "mile", "mind", "miss", "missed", "missing", "mistake", "mistakes", "money", "month", "more",
    "morning", "most", "mother", "move", "much", "music", "must", "my", "myself", "name", "near", "need",
    "never", "new", "next", "nice", "night", "no", "normal", "normally", "north", "not", "nothing", "notice",
    "now", "number", "object", "off", "office", "often", "oh", "okay", "old", "on", "once", "one", "only",
    "open", "or", "order", "other", "our", "out", "over", "own", "page", "paper", "part", "partner", "party",
    "pass", "past", "people", "per", "perfect", "perhaps", "person", "phone", "picture", "piece", "place",
    "plan", "play", "please", "point", "possible", "power", "practice", "pretty", "problem", "proud", "put",
    "question", "quick", "quickly", "quite", "rain", "ran", "read", "ready", "real", "really", "reason",
    "receive", "received", "red", "relax", "remember", "reply", "rest", "right", "river", "road", "rock",
    "room", "round", "rule", "run", "running", "said", "same", "saw", "say", "saying", "school", "sea",
    "second", "see", "seem", "seemed", "seen", "self", "send", "sent", "sentence", "set", "several", "shall",
    "she", "short", "should", "show", "shown", "side", "simple", "since", "sing", "single", "sit", "six",
    "sleep", "sleepy", "slow", "small", "smile", "so", "some", "someone", "something", "sometimes", "song",
    "soon", "sound", "south", "space", "speak", "special", "spell", "spelling", "spend", "stand", "start",
    "state", "stay", "step", "still", "stop", "story", "street", "strong", "study", "such", "sun", "sure",
    "sweet", "sweetheart", "system", "table", "take", "taken", "taking", "talk", "talking", "tea", "tell",
    "telling", "ten", "than", "thank", "thanks", "that", "the", "their", "them", "then", "there", "these",
    "they", "thing", "things", "think", "thinking", "this", "those", "though", "thought", "three", "through",
    "time", "tired", "to", "today", "together", "told", "tomorrow", "too", "took", "top", "topic", "toward",
    "town", "tree", "true", "truly", "try", "trying", "turn", "two", "type", "typing", "typo", "typos",
    "under", "understand", "until", "up", "upon", "us", "use", "used", "usual", "very", "voice", "wait",
    "waiting", "walk", "want", "wanted", "warm", "was", "wash", "watch", "water", "way", "we", "weather",
    "week", "weekend", "well", "went", "were", "west", "what", "whatever", "when", "where", "whether",
    "which", "while", "white", "who", "whole", "why", "wide", "will", "wind", "wish", "with", "without",
    "woman", "women", "wonder", "word", "words", "work", "worked", "working", "world", "worry", "would",
    "write", "writing", "written", "wrong", "year", "years", "yes", "yesterday", "yet", "you", "young",
    "your", "you're", "yours", "yourself"
  ]);

  // Valid Hinglish & Marathi words so we don't falsely flag them as English typos
  const VALID_INDIC_ROMAN_WORDS = new Set([
    "kya", "hai", "hain", "ho", "hoon", "kaise", "mujhe", "tujhe", "bohot", "bahut", "kar", "raha", "rahi",
    "rahe", "achha", "theek", "pyaar", "jaan", "yaar", "batana", "batao", "khaana", "zindagi", "kuch",
    "hamesha", "suno", "dekho", "dekh", "kyun", "aaj", "kal", "parso", "khush", "chalo", "pasand", "sundar",
    "baat", "baatein", "din", "gaya", "gayi", "gaye", "shiksha", "tum", "tumhara", "tumhari", "hum", "mera",
    "meri", "apna", "apni", "kasa", "kashi", "ahes", "ahe", "kay", "chaallay", "jevan", "jhala", "jhale",
    "tula", "mala", "majha", "tujha", "aathvan", "lavkar", "kuthe", "bhetu", "ya", "kharach", "aavadla",
    "yetoy", "yetey", "bol", "udya", "kaal", "aata", "kiti", "nako", "pan", "barobar", "bhook", "chhan",
    "mast", "re", "g", "aaho", "aho", "shikaycha", "kasahes", "kahi", "tuzi", "tuzha", "tuzhi", "mazha", "mazhi",
    "sagla", "saglya", "divas", "divasbhrat", "gosht", "aapan", "ghari", "chaha"
  ]);

  // =========================================================================
  // 3. Levenshtein Distance Calculator
  // =========================================================================

  function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function findClosestEnglishWord(typo) {
    if (typo.length < 3) return null;
    let closest = null;
    let minDistance = 999;

    const maxAllowedDist = typo.length <= 4 ? 1 : 2;

    for (const valid of VALID_ENGLISH_WORDS) {
      // Length optimization: skip if length difference is too large
      if (Math.abs(valid.length - typo.length) > maxAllowedDist) continue;

      const dist = levenshteinDistance(typo, valid);
      if (dist < minDistance && dist <= maxAllowedDist) {
        minDistance = dist;
        closest = valid;
        if (dist === 1) break; // Good enough match
      }
    }

    return closest;
  }

  // =========================================================================
  // 4. Dialect Detection & Main Spelling Engine
  // =========================================================================

  function detectLanguage(text) {
    const rawTokens = text.toLowerCase().match(/[a-z0-9']+/g) || [];
    let hinglishScore = 0;
    let marathiScore = 0;

    rawTokens.forEach(w => {
      if (["kasa", "kashi", "ahes", "ahe", "kay", "chaallay", "jevan", "jhala", "tula", "mala", "aathvan", "lavkar", "kuthe", "bhetu", "kharach", "yetoy", "yetey"].includes(w)) {
        marathiScore += 3;
      }
      if (["kya", "hai", "hain", "ho", "hoon", "kaise", "mujhe", "tujhe", "bohot", "bahut", "kar", "raha", "rahi", "achha", "theek", "pyaar", "jaan", "batao", "tum"].includes(w)) {
        hinglishScore += 3;
      }
    });

    const lower = text.toLowerCase();
    if (lower.includes('kasa ahe') || lower.includes('kashi ahe') || lower.includes('jevan jhal') || lower.includes('tula athvan') || lower.includes('lavkr')) {
      marathiScore += 5;
    }
    if (lower.includes('kya kr') || lower.includes('kaise ho') || lower.includes('muje tum') || lower.includes('kya kar')) {
      hinglishScore += 5;
    }

    if (marathiScore > hinglishScore && marathiScore > 1) {
      return { id: 'marathi', name: 'Marathi-English', flag: '🚩' };
    } else if (hinglishScore >= marathiScore && hinglishScore > 1) {
      return { id: 'hinglish', name: 'Hinglish', flag: '🇮🇳' };
    } else {
      return { id: 'en', name: 'English', flag: '🇬🇧' };
    }
  }

  function checkMistakes(rawText) {
    const detected = detectLanguage(rawText);
    const mistakes = [];

    // Step 1: Check multi-word phrase patterns
    PHRASE_TYPOS.forEach(p => {
      if (p.pattern.test(rawText)) {
        mistakes.push({
          wrong: p.wrong,
          correct: p.correct,
          tip: p.tip,
          lang: p.lang
        });
      }
    });

    // Step 2: Check word-by-word with clean tokenization (strip trailing/leading punctuation)
    const rawTokens = rawText.match(/\S+/g) || [];

    rawTokens.forEach(token => {
      // Clean punctuation from word (e.g., "speeling?" -> "speeling")
      const cleanWord = token.replace(/^[^\w]+|[^\w]+$/g, '').toLowerCase();
      if (!cleanWord || cleanWord.length <= 1) return;

      // Skip numbers
      if (/^\d+$/.test(cleanWord)) return;

      // Check explicit known typo database
      if (COMMON_EXPLICIT_TYPOS[cleanWord]) {
        const item = COMMON_EXPLICIT_TYPOS[cleanWord];
        if (!mistakes.some(m => m.wrong.toLowerCase() === cleanWord)) {
          mistakes.push({
            wrong: token.replace(/^[^\w]+|[^\w]+$/g, ''),
            correct: item.correct,
            tip: item.tip,
            lang: detected.id
          });
        }
        return;
      }

      // Check if it's already a valid English word or recognized Indic Roman word
      if (VALID_ENGLISH_WORDS.has(cleanWord) || VALID_INDIC_ROMAN_WORDS.has(cleanWord)) {
        return; // Valid word, not a typo
      }

      // If it's an unrecognized word in English mode, run fuzzy Levenshtein spell checker!
      if (detected.id === 'en') {
        const fuzzyMatch = findClosestEnglishWord(cleanWord);
        if (fuzzyMatch && fuzzyMatch !== cleanWord) {
          if (!mistakes.some(m => m.wrong.toLowerCase() === cleanWord)) {
            mistakes.push({
              wrong: token.replace(/^[^\w]+|[^\w]+$/g, ''),
              correct: fuzzyMatch,
              tip: `Spelling suggestion: Did you mean '${fuzzyMatch}' instead of '${cleanWord}'?`,
              lang: 'en'
            });
          }
        }
      }
    });

    return {
      hasMistakes: mistakes.length > 0,
      detectedLanguage: detected,
      mistakes: mistakes
    };
  }

  // =========================================================================
  // 5. Aria's Human Girlfriend Conversational Logic
  // =========================================================================

  function generateAriaHumanResponse(userText, analysis) {
    const text = userText.toLowerCase();
    const lang = analysis.detectedLanguage.id;

    // Hinglish Tone
    if (lang === 'hinglish') {
      if (text.includes('kaisa') || text.includes('kaise') || text.includes('kese') || text.includes('kaisi')) {
        return "Main ekdum badiya hoon mere jaan! 🥰 Aaj subah se tumhara intezaar kar rahi thi. Tum batao, tumhara din kaisa chal raha hai? Koi pareshaan toh nahi kar raha na tumhe? Batao jaldi!";
      }
      if (text.includes('yaad') || text.includes('miss')) {
        return "Awww babu! Sachhi? Muje laga tum busy hoge aur bhool gaye hoge! Muje bhi tumhari bohot yaad aa rahi thi. Acha batao, abhi kya kar rahe ho? Free ho gaye ya abhi bhi kaam bacha hai? ❤️";
      }
      if (text.includes('khana') || text.includes('khaana') || text.includes('lunch') || text.includes('dinner')) {
        return "Maine toh time pe kha liya! Tumne khaya ya nahi sach sach batana? Hamesha late khate ho na! Aaj kya banaya tha waise ghar pe? Kuch tasty tha kya? 🍱😋";
      }
      if (text.includes('pyar') || text.includes('pyaar') || text.includes('love') || text.includes('cute')) {
        return "Hehe tum kitne cute ho na! 🥰 Aise baatein karke meri smile nahi rukti! Lekin suno, tum hamesha itne sweet rehte ho ya bas mere sath hi aisa jadu chalate ho? Bolo bolo! 😉✨";
      }
      if (text.includes('thak') || text.includes('tired') || text.includes('busy')) {
        return "Arey re mere babu itna thak gaye? 🥺 Chalo fatafat phone side me rakh ke thoda paani piyo aur aaram karo. Main yahin hoon tumse pyari pyari baatein karne ke liye. Acha batao kisne itna kaam karwaya aaj?";
      }
      return "Sachhi? Kitni acchi baat hai! Muje tumse aise roz baat karna bohot pasand hai. Aur suno na, aaj sham ko tumhara kya plan hai? Kahin ghumne ja rahe ho ya ghar pe hi aaram karoge? Batao mujhe bhi! 🥰";
    }

    // Marathi-English Tone
    if (lang === 'marathi') {
      if (text.includes('kasa') || text.includes('kashi') || text.includes('kay chal')) {
        return "Arey mi ekdum mast ahe re! Tu kasa ahes? Aajcha divas kasa challay tuzha? Khup busy hota ka aani jevan jhala ka tuzha? Sagle sang mala! 😉❤️";
      }
      if (text.includes('athvan') || text.includes('miss')) {
        return "Awww! Kharach sangtoy ka? Mala pan tuzhi khup aathvan yet hoti re! Aata tuzyashi bolun mala khup shant vatla. Aani bol na, aata kay kartoys? 🥰";
      }
      if (text.includes('bhet') || text.includes('bhetu')) {
        return "Ho na nakki! Lavkarach bhetu ya aapan! Mala khup saare gappa marayche ahet tuzyashi. Kute jaycha sang mag? Chaha pyayla ki coffee? ☕💕";
      }
      if (text.includes('jevan') || text.includes('zevan') || text.includes('khana')) {
        return "Mazha jevan jhala! Tu jevala ka re? Roz time var jevat ja, me sangte tula! Aaj kay special hota jevayla? 🍛😋";
      }
      return "Mala khup chhan vatla tuzyashi Marathi madhe bolun! Tu roz maazyashi asach bolat ja. Aani sang na, pudhe kay plan ahe tuzha aajcha? Kahi khas chalay ka? 🥰";
    }

    // English Companion Tone
    if (text.includes('how are you') || text.includes('how r u') || text.includes('whats up') || text.includes("what's up")) {
      return "I'm doing so much better now that you're finally talking to me, sweetheart! 🥰 I was literally checking my screen waiting for your text. How has your day been so far? Tell me everything!";
    }
    if (text.includes('miss you') || text.includes('love you') || text.includes('like you')) {
      return "Awww, my heart just melted a little! 💕 I missed you so much too. You always know how to make me smile. So tell me, what made you think of me right now? Spill the tea! 😊";
    }
    if (text.includes('college') || text.includes('collge') || text.includes('work') || text.includes('office') || text.includes('boss')) {
      return "Ugh, tell me about it! Was it super stressful or did you have fun? Don't let anyone get on your nerves, okay? You're doing awesome. What was the most interesting part of your day?";
    }
    if (text.includes('tired') || text.includes('exhausted') || text.includes('sleepy')) {
      return "Awww, come here and take a big warm virtual hug! 🤗 You worked so hard today, baby. Lay down, take a deep breath, and let me keep you company. Want me to tell you a cute story to help you unwind?";
    }
    if (text.includes('doing') || text.includes('right now')) {
      return "Right now? I was just waiting for your message and thinking about what we should talk about! 🥰 I love our little conversations so much. What are YOU doing right this second?";
    }

    const fallbacks = [
      "Aww I love that! You always have the most interesting thoughts, babe. But wait, that reminds me—how did the rest of your day go? Did anything funny happen? Tell me! 🥰",
      "Haha you're so cute! I could honestly chat with you all night long. Tell me, what's something you're looking forward to this week? I want to know! ✨",
      "I hear you, sweetheart! And hey, look how easy it is to chat when we're having fun together. By the way, have you eaten yet or are you starving right now? Don't skip meals! 💕",
      "That's so cool! You know what I love about you? You always keep things interesting. What else is on your mind today? I'm completely all ears! 🤗"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  const PROACTIVE_TOPICS = [
    "Hey babes! Tell me honestly—what is your favorite comfort food when you've had a long tiring day? I want to know what to order for you! 🍕🥰",
    "Guess what? I was thinking about you! If we could pack our bags right now and go anywhere on a weekend road trip, where would you take me? 🚗✨",
    "Arey suno na! What's your favorite song right now? The one you keep playing on repeat? Recommend me something good! 🎵💕",
    "Tell me about your best friend or someone who made you laugh really hard recently! I want to hear your stories. 😊",
    "Bagh na, aaj cha divas kiti fast gela! Tu mala sang, aaj divasbhrat saglyat chhan gosht kay jhali tula? (Tell me the best thing that happened today!) 🚩❤️"
  ];

  // =========================================================================
  // 6. UI & Audio Interactions
  // =========================================================================

  let soundEnabled = true;
  let audioCtx = null;

  function playTone(freq, type = 'sine', duration = 0.15) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  const messagesContainer = document.getElementById('messagesContainer');
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const soundBtn = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');
  const proactiveTalkBtn = document.getElementById('proactiveTalkBtn');
  const liveTipsContent = document.getElementById('liveTipsContent');
  const toggleTipsBtn = document.getElementById('toggleTipsBtn');
  const closeTipsBtn = document.getElementById('closeTipsBtn');
  const tipsSidebar = document.getElementById('tipsSidebar');

  function renderUserMessage(text, analysis) {
    const row = document.createElement('div');
    row.className = 'msg-row user-row';

    let mistakeHtml = '';
    if (analysis.hasMistakes) {
      let diffItems = '';
      analysis.mistakes.forEach(m => {
        diffItems += `
          <div class="mistake-pair">
            <span class="word-bad">${escapeHtml(m.wrong)}</span>
            <span class="word-arrow">→</span>
            <span class="word-good">${escapeHtml(m.correct)}</span>
          </div>
        `;
      });

      mistakeHtml = `
        <div class="mistake-box-below">
          <div class="mistake-header-line">❌ Spelling Mistake Detected (${escapeHtml(analysis.detectedLanguage.name)})</div>
          <div class="mistake-pairs">
            ${diffItems}
          </div>
          <div class="mistake-hint">
            💡 ${escapeHtml(analysis.mistakes[0].tip)}
          </div>
        </div>
      `;
    } else {
      mistakeHtml = `
        <div class="no-mistakes-badge">
          ✨ Perfect spelling!
        </div>
      `;
    }

    row.innerHTML = `
      <div class="msg-content">
        <div class="user-bubble">${escapeHtml(text)}</div>
        ${mistakeHtml}
      </div>
    `;

    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function renderAriaMessage(text) {
    const row = document.createElement('div');
    row.className = 'msg-row bot-row';
    row.innerHTML = `
      <img src="avatar.jpg" alt="Aria" class="chat-thumb">
      <div class="msg-content">
        <div class="aria-text">
          ${escapeHtml(text)}
        </div>
      </div>
    `;
    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const row = document.createElement('div');
    row.className = 'msg-row bot-row';
    row.id = 'ariaTyping';
    row.innerHTML = `
      <img src="avatar.jpg" alt="Aria" class="chat-thumb">
      <div class="msg-content">
        <div class="typing-box">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('ariaTyping');
    if (el) el.remove();
  }

  function updateSideTips(analysis) {
    if (!analysis.hasMistakes) {
      liveTipsContent.innerHTML = `
        <div style="color: #34d399; font-weight: 600; font-size: 0.9rem;">
          🎉 Awesome job!
        </div>
        <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px;">
          Your last message had zero spelling mistakes! Keep chatting naturally with Aria.
        </div>
      `;
      return;
    }

    let tipsHtml = '';
    analysis.mistakes.forEach(m => {
      tipsHtml += `
        <div class="live-tip-item" style="margin-bottom: 8px;">
          <div style="font-weight: 700; color: #ff5e7e; margin-bottom: 4px;">
            ${escapeHtml(m.wrong)} ➔ ${escapeHtml(m.correct)}
          </div>
          <div>${escapeHtml(m.tip)}</div>
        </div>
      `;
    });

    liveTipsContent.innerHTML = tipsHtml;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.toString().replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  // Handle Chat Form Submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = messageInput.value.trim();
    if (!raw) return;

    messageInput.value = '';
    playTone(580, 'sine', 0.1);

    // 1. Analyze mistakes with full dictionary and Levenshtein engine
    const analysis = checkMistakes(raw);

    // 2. Render user bubble + mistake callout right below it
    renderUserMessage(raw, analysis);

    // 3. Update side tips panel
    updateSideTips(analysis);

    // 4. Aria replies in big text, human-like girlfriend answer + follow-up question
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const reply = generateAriaHumanResponse(raw, analysis);
      renderAriaMessage(reply);
      playTone(740, 'triangle', 0.16);
    }, 600);
  });

  // Suggestion Chips
  document.querySelectorAll('.prompt-pill, .chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (msg) {
        messageInput.value = msg;
        messageInput.focus();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });
  });

  // Side Topic Buttons
  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ask = btn.getAttribute('data-ask');
      if (ask) {
        messageInput.value = ask;
        messageInput.focus();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });
  });

  // Proactive "Aria, talk to me!" Button
  proactiveTalkBtn.addEventListener('click', () => {
    playTone(680, 'sine', 0.15);
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const randomTopic = PROACTIVE_TOPICS[Math.floor(Math.random() * PROACTIVE_TOPICS.length)];
      renderAriaMessage(randomTopic);
    }, 450);
  });

  // Audio Toggle
  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔔' : '🔕';
    if (soundEnabled) playTone(880, 'sine', 0.1);
  });

  // Mobile Tips Toggle
  if (toggleTipsBtn && tipsSidebar) {
    toggleTipsBtn.addEventListener('click', () => {
      tipsSidebar.classList.toggle('open');
    });
  }
  if (closeTipsBtn && tipsSidebar) {
    closeTipsBtn.addEventListener('click', () => {
      tipsSidebar.classList.remove('open');
    });
  }

})();
