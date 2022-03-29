'''
async function a(key) {
  resp = await fetch('https://relatedwords.org/api/related?term='+key)
  text = await resp.text()
  words = JSON.parse(text)
  words = words.filter(word => word.score > 0.5).map(word => ({word: word.word, score: word.score}))
  console.log(`
  ${words.map(word => `'${word.word}'`).join(', ')}
  `)
}
'''

porno = {'pornography', 'porn', 'nudity', 'movie', 'smut', 'erotica', 'creation', 'eroticism', 'photograph',
         'striptease', 'cheesy', 'sexploitation', 'spoof', 'prostitution', 'schlock', 'weirdo', 'sex', 'cybersex',
         'story', 'masturbation', 'moral', 'religion', 'drawing', 'painting', 'animation', 'hammock', 'pornographic',
         'bedstead', 'bedchamber'}
pornography = {
    'porn', 'prostitution', 'internet', 'pornographic', 'sex', 'erotica', 'porno', 'striptease', 'smut', 'obscenity',
    'censorship', 'eroticism', 'nudity', 'sexual arousal', 'pornographic film', 'creation', 'masturbation', 'animation',
    'erotic literature', 'photograph', 'voyeurism', 'pornographic film actor', 'trafficking', 'blue movie', 'movie',
    'andy warhol', 'websites', 'videos', 'religion', 'cyberspace', 'minors', 'united states', 'indecency', 'bestiality',
    'golden age of porn', 'pedophilia', 'gambling', 'methamphetamine', 'prostitutes', 'copyright', 'novel', 'oral sex',
    'pedophile', 'story', 'model', 'sexting', 'morality', 'moral', 'production', 'consumption', 'multimedia',
    'common law', 'playboy', 'drawing', 'painting', 'graphics', 'downloading', 'athenaeus', 'prehistory', 'softcore',
    'impressionism', 'pornhub', 'redtube', 'copying', 'indecent', 'olympia', 'youporn', 'pompeii', 'exhibitionists'
}
sex = {
    'male', 'female', 'gender', 'sexuality', 'sexual intercourse', 'hermaphrodite', 'chromosome', 'sexual',
    'reproduction', 'excite', 'sexual activity', 'bisexuality', 'coitus', 'copulation', 'homosexual', 'homosexuality',
    'intercourse', 'meiosis', 'gamete', 'porn', 'fish', 'species', 'insect', 'asexual', 'androgynous', 'nonsexual',
    'procreation', 'isogamy', 'homosexualism', 'hermaphroditism', 'androgyny', 'sex act', 'x0 sex-determination system',
    'zw sex-determination system', 'eukaryote', 'sexually', 'heterosexual', 'safe sex', 'arouse', 'sperm', 'pregnancy',
    'mating', 'wind up', 'turn on', 'sexual urge', 'sex activity', 'bestiality', 'lovemaking', 'sodomy',
    'heterosexuality', 'promiscuity', 'intersex', 'prostitute', 'mammal', 'sexology', 'outercourse', 'foreplay',
    'anisogamy', 'conjugation', 'pollen', 'ovum', 'gene', 'malaria', 'mitosis', 'gay', 'pornography',
    'carnal knowledge', 'sexual perversion', 'sext', 'prostitution', 'gametes', 'protist', 'orgasm', 'lesbian',
    'cybersex', 'marriage', 'evolution', 'insemination', 'condom', 'xy sex-determination system',
    'sex-determination system', 'transgender', 'molestation', 'prostitutes', 'adultery', 'bird', 'nudity',
    'transsexual', 'masturbation', 'genitalia', 'sexual dimorphism', 'sexual selection', 'anal sex', 'fellatio',
    'sex ratio', 'sexual arousal', 'chromosomal crossover', 'organism', 'plant', 'genetics', 'cell', 'animal', 'fungi',
    'uterus', 'tell', 'activity', 'tempt', 'stir', 'straightness', 'queerness', 'separate', 'lechery', 'perversion',
    'stimulation', 'stimulate', 'arousal', 'breeding', 'distinguish', 'differentiate', 'union', 'pairing', 'coupling',
    'love', 'pleasure', 'relation', 'conception', 'family', 'class', 'category', 'feeling', 'bondage', 'shake',
    'masculinity', 'unisex', 'sexless', 'sexism', 'hermaphrodites', 'eukaryotes', 'bareback', 'sexsational',
    'sexploration', 'unisexual', 'intersexed', 'sexuoerotic', 'sexpionage', 'severalise', 'coition', 'secernate',
    'secern', 'femaleness', 'autoeroticism', 'maleness', 'autoerotism', 'zooerasty', 'zooerastia', 'severalize',
    'heterosexualism', 'homoeroticism', 'gayness', 'promiscuousness', 'feminineness', 'sexaholic', 'leathersex',
    'child', 'sextravaganza', 'electrosex', 'copulate', 'sexist', 'sexaholism', 'sexhood', 'hermaphroditic',
    'sexual practice', 'abuse', 'sexpert', 'procreate', 'sexualism', 'genderswap', 'sexpot', 'adult', 'intersexual',
    'crustacean', 'sextastic', 'teen', 'sexgate', 'coital', 'hexa', 'fuck', 'autosomal', 'behavior', 'oversexed',
    'pleasurable', 'ejaculate', 'teenagers', 'children', 'platypus', 'sexy', 'doublesex', 'sexlinked', 'teens', 'dna',
    'toni', 'parents', 'crime', 'discrimination', 'cissexual', 'pseudohermaphrodite', 'adults', 'minors', 'girls',
    'diploid', 'cisperson', 'divorce', 'smoking', 'enjoyable', 'life', 'sexship', 'women', 'postfuck', 'haploid',
    'abortion', 'murder', 'woman'
}
pedophilia = {'paraphilia', 'paedophilia', 'incest', 'child sexual abuse', 'hebephilia', 'psychopathology',
              'ephebophilia', 'puberty', 'sex', 'american psychiatric association', 'psychopathy', 'icd-10', 'fetish',
              'paedophile', 'pedophile', 'diagnostic and statistical manual of mental disorders', 'prostitution',
              'molestation', 'homosexuality', 'abuse', 'bestiality', 'infidelity', 'abusers', 'adultery', 'homophobia',
              'kansas v. hendricks', 'civil commitment', 'homosexual', 'greek language', 'racism', 'lesbianism',
              'proselytism', 'pornography', 'perversion', 'scientology', 'criminality', 'pederasty', 'bisexuality',
              'priests', 'celibacy', 'bullying', 'trafficking', 'sexual', 'cybersex', 'stalking', 'necrophilia',
              'voyeurism', 'child grooming', 'sexual arousal', 'masturbation', 'fantasy', 'child', 'minor', 'infant',
              'dsm-5', 'toddler', 'indecent exposure', 'philia', 'association', 'mri', 'fmri', 'self-esteem',
              'hypothalamus', 'neuroimaging', 'neuroticism', 'cognitive', 'psychoticism', 'abuser', 'lust'
              }
adult = set.union(porno, pornography, sex, pedophilia)

cocain = {
    'cannabis', 'crack cocaine', 'cocaine', 'coca', 'stimulant', 'methamphetamine', 'heroin', 'hydrolysis', 'euphoria',
    'insufflation', 'coke', 'snow', 'c', 'illegal drug', 'vasoconstrictor', 'morphine', 'tachycardia', 'hyperthermia',
    'alkaloid', 'stroke', 'mydriasis', 'amphetamine', 'cardiovascular', 'benzocaine', 'lignocaine', 'lidocaine',
    'phenylephrine', 'cocaine dependence', 'myocardial infarction', 'sudden cardiac death',
    'single convention on narcotic drugs', 'coca tea', 'tropinone', 'marijuana', 'opium', 'vasoconstriction', 'codeine',
    'narcotic', 'lsd', 'baccy', 'dopamine', 'snort', 'dope', 'drug addict', 'dopamine transporter', 'liver', 'ethanol',
    'veins', 'psychosis', 'hypertension', 'salt', 'sepsis', 'quinine', 'neurotransmitter', 'benzoylecgonine',
    'anesthetic', 'crack', 'blow', 'tornado', 'epinephrine', 'adrenaline', 'parachute', 'physiological', 'psychotropic',
    'anhedonia', 'stimulation', 'peruvians', 'hawaii', 'georgia', 'peru', 'mucus', 'bolivia', 'proparacaine',
    'currency', 'basuco', 'pen', 'xylocaine', 'illegal', 'tetracaine', 'fingernails', 'mirror', 'otolaryngology',
    'cauterization', 'tinnitus', 'embolism', 'speedball', 'blunt', 'itch', 'hallucination', 'nadph', 'arrhythmia',
    'addictive', 'striatum'
}

drug = {
    'medicine', 'dope', 'psychoactive drug', 'medication', 'dose', 'stimulant', 'narcotic', 'injectable',
    'pharmaceutical', 'pharmacy', 'analgesic', 'prescription', 'prescription drug', 'alcohol', 'drop', 'absorption',
    'antisyphilitic', 'abortifacient', 'medicate', 'addiction', 'medicament', 'aspirin', 'tobacco', 'cannabis',
    'fertility drug', 'narcotize', 'pharmaceutical drug', 'smoking', 'magic bullet', 'generic', 'antiviral',
    'pharmacist', 'preventive medicine', 'physician', 'benzodiazepine', 'do drugs', 'anticonvulsant', 'antidrug',
    'generic drug', 'antiemetic', 'probenecid', 'antidepressant', 'antibiotic', 'illegal', 'cocaine', 'marijuana',
    'psychoactive substance', 'opiate', 'narcotics', 'heroin', 'amphetamine', 'methamphetamine', 'drug class', 'pills',
    'medicines', 'chemical structure', 'mechanism of action', 'caffeine', 'vaccine', 'steroids', 'mode of action',
    'cancer', 'anatomical therapeutic chemical classification system', 'atc code',
    'biopharmaceutics classification system', 'hallucinogen', 'drug addiction', 'recreational drug use',
    'single convention on narcotic drugs', 'who', 'over-the-counter drug', 'ingestion', 'substance', 'druggist',
    'pharmacology', 'antihistamine', 'organism', 'codeine', 'anticholinergic', 'antibacterial', 'anticoagulant',
    'biomedicine', 'chronic', 'immunology', 'prodrug', 'paregoric', 'food', 'apc', 'oncology', 'therapeutic',
    'rheumatology', 'gastroenterology', 'anesthesiology', 'placebo', 'radiotherapy', 'insufflation', 'hypnotic',
    'agent', 'relaxant', 'arsenical', 'pharmacopoeia', 'diuretic', 'botanical', 'overdose', 'orally', 'agonist',
    'anaphylaxis', 'antagonist', 'anesthetic', 'trip', 'anaesthetic', 'excitant', 'soporific', 'poison', 'base', 'use',
    'inject', 'snort', 'nephrology', 'drugs', 'purgative', 'palliative', 'neurology', 'nonspecific', 'panacea',
    'therapy', 'pcp', 'clinician', 'laxative', 'urology', 'penicillin', 'curative', 'nostrum', 'remedy', 'medical',
    'virology', 'dermatology', 'pediatrics', 'catatonic', 'psychiatry', 'gynecology', 'medic', 'nondrug', 'peptic',
    'insulin', 'sedation', 'paracetamol', 'refractory', 'dispensary', 'pharmaceutic', 'neurologist', 'allopurinol',
    'tiamulin', 'antidiabetic', 'acyclovir', 'opium', 'disulfiram', 'pentylenetetrazol', 'antispasmodic', 'carminative',
    'gemfibrozil', 'antidiarrheal', 'decongestant', 'antiprotozoal', 'expectorant', 'md', 'splint', 'premedication',
    'antitussive', 'pharmacon', 'physostigmine', 'psychotic', 'isoproterenol', 'medicinal', 'isosorbide', 'amrinone',
    'antiarrhythmic', 'potentiation', 'perception', 'immunosuppressant', 'fever', 'clofibrate', 'medicative',
    'vermifuge', 'antipyretic', 'sucralfate', 'antihypertensive', 'psychomedicine', 'anticholinesterase', 'mood',
    'neurotropic', 'postdrug', 'parenteral', 'premedical', 'neuropsychiatry', 'clonic', 'azathioprine', 'aesculapian',
    'venesect', 'traumatology', 'nonprescription', 'urinalysis', 'vermicide', 'penicillamine', 'proctology',
    'consciousness', 'lorfan', 'anaesthetize', 'anaesthetise', 'free-base', 'anesthetize', 'uninjectable', 'habituate',
    'narcotise', 'potentiate', 'aborticide', 'synergist', 'suppressant', 'dilator', 'feosol', 'fergon', 'o.d.',
    'intoxicant', 'trental', 'levallorphan', 'pentoxifylline', 'mydriatic', 'myotic', 'miotic', 'anesthetise',
    'podiatry', 'papaverine', 'hematinic', 'leechcraft', 'counterirritant', 'ethanol', 'ethnomedicine', 'suppository',
    'mfm', 'pseudomedical', 'iatrophysics', 'polychrest', 'nonmedical', 'noninvasive', 'antidiuretic', 'infection',
    'depressant', 'nosology', 'wonderdrug', 'pulmonology', 'bronchodilator', 'panpharmacon', 'nicotine', 'nanomedicine',
    'trafficking', 'achromia', 'vasoconstrictor', 'oxytocic', 'phytomedicine', 'succedaneum', 'unguent', 'traffickers',
    'digitalize', 'cases', 'zymosis', 'mercurialist', 'rubefacient', 'otology', 'treatment', 'hiv', 'tylenol',
    'medications', 'aids', 'linked', 'smuggling'
}.union(cocain)

gambling = {
    'play', 'risk', 'bet', 'casino', 'wager', 'money', 'venture', 'roulette', 'blackjack', 'chance', 'adventure',
    'hazard', 'take a chance', 'take chances', 'run a risk', 'stake', 'metagaming', 'dice', 'stakes', 'game', 'bingo',
    'investment', 'bid', 'fortune', 'luck', 'europe', 'windfall', 'ante', 'craps', 'speculation', 'poker', 'lottery',
    'stock', 'investments', 'addiction', 'value', 'event', 'law', 'attempt', 'raise', 'try', 'peril', 'essay', 'danger',
    'assay', 'seek', 'china', 'baccarat', 'pogs', 'keno', 'playable', 'monaco', 'replay', 'procter', 'macau',
    'probability', 'gameplaying', 'ludology', 'insurance', 'larp'
}

account = {
    'statement', 'bill', 'history', 'invoice', 'accounting', 'capital account', 'explanation', 'financial statement',
    'credit', 'recital', 'report', 'chronicle', 'reason', 'balance', 'debit', 'suspense account', 'expense account',
    'bank account', 'anecdote', 'story', 'calculate', 'score', 'annals', 'narration', 'record', 'account statement',
    'business relationship', 'news report', 'write up', 'check', 'case history', 'urban legend', 'instance', 'payment',
    'money', 'savings', 'ledger', 'bank', 'bankbook', 'describe', 'accountancy', 'debit card', 'communique', 'bulletin',
    'newsletter', 'news', 'tab', 'chit', 'tally', 'reckoning', 'comment', 'life', 'be', 'biography', 'etymology',
    'importance', 'profit', 'gain', 'yarn', 'debriefing', 'informing', 'overbalance', 'interpretation', 'charge',
    'definition', 'deriving', 'inform', 'declare', 'derivation', 'rubric', 'relationship', 'gloss', 'explication',
    'exposition', 'justification', 'compound', 'simplification', 'scoop', 'exclusive', 'dispatch', 'ground', 'despatch',
    'gossip', 'accounts', 'accountant', 'explicandum', 'megillah', 'explanandum', 'walk-through', 'summarisation',
    'summarization', 'explanans', 'newssheet', 'scuttlebutt', 'etymologizing', 'value', 'answer for', 'interest',
    'moreover', 'actual', 'basis', 'according', 'comparison', 'revenue', 'personal', 'terms', 'information', 'amount',
    'given', 'substantial', 'claims', 'numbers', 'income', 'fact', 'data', 'provided', 'subject', 'related',
    'significant', 'noting', 'partly', 'transactions', 'example', 'payments', 'volume', 'direct', 'further', 'assets',
    'estimates', 'about', 'funds', 'details', 'suggests', 'expense', 'number', 'cash', 'documents', 'deals', 'reports',
    'own', 'any', 'extent', 'share', 'finding', 'cost', 'this', 'same', 'accountable', 'estimate', 'those', 'figures',
    'worth', 'costs', 'reporting', 'that', 'revenues', 'benefits', 'reasons', 'volumes', 'more', 'expenses', 'initial',
    'previous', 'suggest', 'sources', 'making', 'giving', 'than', 'transaction', 'some', 'detailed', 'contributions',
    'much', 'write', 'which', 'compares', 'tax', 'suggesting', 'beyond', 'issues', 'paid', 'explaining', 'particular',
    'actually', 'issue', 'of', 'additional', 'though', 'times'
}
leak = {
    'break', 'leakage', 'escape', 'fluid', 'rupture', 'outflow', 'wetting', 'news leak', 'passing water',
    'making water', 'leak out', 'get around', 'get out', 'bust', 'gas', 'bilge', 'divulge', 'uncover', 'run', 'unwrap',
    'spill', 'breach', 'fall apart', 'seepage', 'rift', 'fallout', 'contamination', 'crack', 'fissure', 'explosive',
    'explosion', 'fumes', 'malfunction', 'flee', 'vapors', 'vacuum', 'seep', 'getaway', 'wreck', 'seal', 'pipe',
    'valve', 'tank', 'hull', 'liquid', 'viscosity', 'solid', 'outpouring', 'discharge', 'revelation', 'revealing',
    'disclosure', 'disclose', 'reveal', 'expose', 'discover', 'issue', 'emerge', 'egress', 'wear', 'urination',
    'euphemism', 'hole', 'powder', 'rust', 'leaks', 'corrosion', 'leaking', 'welding', 'vehicle', 'tire', 'hydraulic',
    'micturition', 'brake', 'leaked', 'breaker', 'hiatus', 'radiator', 'breakage', 'brokenly', 'bork', 'burst',
    'fracture', 'radioactive', 'shatter', 'disintegration', 'refrigerant', 'crumbly', 'ruggedness'
}.union(account)

weapon = {
    'sword', 'gun', 'missile', 'spear', 'firearm', 'ammunition', 'artillery', 'projectile', 'rifle', 'pistol', 'bomb',
    'bow', 'weaponry', 'arm', 'arms', 'knife', 'munition', 'cannon', 'guns', 'shotgun', 'tool', 'gunpowder', 'rocket',
    'weapon system', 'world war ii', 'military', 'hunting', 'instrument', 'pike', 'bronze age', 'firearms', 'tank',
    'war', 'machine gun', 'animal', 'fire ship', 'warfare', 'warhead', 'rock', 'armor', 'weapons', 'explosive',
    'intercontinental ballistic missile', 'biological warfare', 'device', 'enemy', 'deterrent', 'sidearm', 'machine',
    'caliber', 'firing', 'element', 'type', 'threat', 'target', 'dangerous', 'vehicle', 'warship', 'army', 'fire',
    'weapon of mass destruction', 'ammo', 'power', 'armour', 'siege weapon', 'technology during world war i', 'injury',
    'crime', 'club', 'teeth', 'axe', 'claw', 'tusk', 'knuckles', 'flamethrower', 'slasher', 'sling', 'lance', 'shaft',
    'blade', 'brand', 'steel', 'hatchet', 'tomahawk', 'wmd', 'persuasion', 'suasion', 'stone', 'self-defense',
    'hominids', 'bc', 'obsidian', 'neolithic', 'copper', 'metal', 'cyberweapon', 'knucks', 'w.m.d.', 'fortifications',
    'catapult', 'spoke', 'chariot', 'china', 'cavalry', 'assault', 'handgun', 'europe', 'capable', 'explosives',
    'trireme', 'possessing', 'arsenal', 'bombs', 'missiles', 'lethal', 'capability', 'revolver', 'knights',
    'conventional', 'carry', 'nuclear', 'battery', 'ballistic', 'infantry', 'using'
}

murder = {
    'homicide', 'manslaughter', 'assassination', 'infanticide', 'suicide', 'crime', 'slay', 'slaying', 'kill',
    'common law', 'hit', 'bump off', 'dispatch', 'revenge', 'massacre', 'parricide', 'murderer', 'filicide', 'killer',
    'thuggee', 'genocide', 'california', 'mutilate', 'remove', 'mangle', 'slaughter', 'mariticide', 'carnage',
    'regicide', 'fratricide', 'jurisdiction', 'tyrannicide', 'bloodshed', 'uxoricide', 'execution', 'butchery',
    'polish off', 'burke', 'mass murder', 'murderess', 'execute', 'felony', 'victim', 'lynching', 'decapitation',
    'patricide', 'kidnapping', 'robbery', 'canada', 'serial killer', 'matricide', 'criminal', 'first degree murder',
    'arrest', 'strangulation', 'death', 'abduction', 'conspiracy', 'accomplice', 'conviction', 'killing', 'molestation',
    'suspects', 'strangler', 'arson', 'prosecution', 'sentence', 'treason', 'imprisonment', 'disappearance', 'burglary',
    'prosecutors', 'extortion', 'assault', 'united states', 'defendant', 'malice aforethought', 'self defense',
    'country', 'aggravation', 'off', 'person', 'justification', 'excuse', 'assassinate', 'homicidal', 'slayer',
    'assassin', 'murderous', 'deterrence', 'rehabilitation', 'law', 'bloodbath', 'oppression', 'cide', 'decimate',
    'slaughterer', 'lynch', 'liquidation', 'distort', 'gore', 'elimination', 'falsify', 'warp', 'exterminator', 'saber',
    'poisoner', 'murderee', 'slaught', 'killingly', 'unslain', 'euthanasia', 'murdersome', 'electrocute', 'killbot',
    'combatants', 'instakill', 'murderable', 'poison', 'criminalization', 'killable', 'fetus', 'lethal', 'murders',
    'vagina', 'electrocution', 'horizontalize', 'accident', 'convicted', 'teamkill', 'guilty', 'obliterable',
    'nonkilling', 'manslaying', 'proto-indo-european', 'exterminate', 'garble', 'dry-gulching', 'shoot-down', 'bane',
    'anglo-saxon', 'lethality', 'trial', 'sororicide', 'sentenced', 'acquitted', 'pleaded', 'magistricide',
    'eradication', 'decimation', 'avenge', 'charged', 'alleged', 'charges', 'butcher', 'poisoning', 'insanity',
    'killings', 'crimes', 'murdering', 'self-defence', 'executioner', 'photokilling', 'killjoy', 'confessed',
    'invincible', 'non-combatants', 'vengeance', 'winterkill', 'suspect', 'counts', 'precedent', 'killers', 'maniac',
    'arrested', 'case', 'codification', 'killology', 'legal', 'democide', 'slaughterhouse', 'cadaver', 'witness',
    'innocent', 'stabbing', 'organism', 'murdered', 'theft', 'indictment', 'jail', 'toxin', 'custody', 'femicide',
    'simpson', 'slaughterman', 'indicted', 'butch', 'venom', 'involvement', 'poisonous', 'abuse', 'defendants',
    'attempted', 'sex', 'adultery', 'suspicion', 'amok'
}

vulnerability = {

    'exposure', 'weakness', 'fragility', 'danger', 'threat', 'harm', 'weaknesses', 'defencelessness', 'resilience',
    'vulnerable', 'insecurity', 'sensitivity', 'vulnerabilities', 'hazard', 'security', 'severity', 'shortcomings',
    'weak', 'natural environment', 'flaw', 'peril', 'abuse', 'disasters', 'methodology', 'multidisciplinary', 'poverty',
    'system', 'unprotectedness', 'defenselessness', 'frangibleness', 'frangibility', 'breakability', 'destructibility',
    'assailability', 'perception', 'susceptibility', 'frailty', 'risk', 'poses', 'dangers', 'inherent',
    'natural disaster', 'fragile', 'pose', 'perceptions', 'propensity', 'climate', 'risks', 'posed', 'heightened',
    'instability', 'apathy', 'perceived', 'underscores', 'weakened', 'weakening', 'poor', 'alarming', 'anxiety',
    'troubling', 'persistent', 'weaker', 'debility', 'weakens', 'underscoring', 'low', 'implications', 'pervasive',
    'reminder', 'exposes', 'lack'
}
hacking = {
    'cut', 'hacker', 'drudge', 'edit', 'steal', 'chop', 'plug', 'nag', 'whoop', 'jade', 'cab', 'taxi', 'taxicab',
    'horse', 'foul', 'ward-heeler', 'cut up', 'hack on', 'hack writer', 'literary hack', 'machine politician',
    'political hack', 'equus caballus', 'computer', 'axe', 'tool', 'phishing', 'trojan horse', 'pirate', 'crack', 'bot',
    'malware', 'tricks', 'cheat', 'shooter', 'trick', 'mount', 'auto', 'automobile', 'car', 'machine', 'motorcar',
    'fleet', 'author', 'writer', 'pol', 'politician', 'politico', 'cough', 'program', 'programme', 'rugby',
    'basketball', 'hoops', 'ax', 'contend', 'cope', 'deal', 'grapple', 'manage', 'minicab', 'plodder', 'slogger',
    'redact', 'rugger'
}.union(vulnerability)
