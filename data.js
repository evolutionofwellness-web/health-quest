// Health Quest - Game Data

// Questions organized by zone - each zone has 3 questions
const QUESTIONS = {
    sleep: [
        {
            id: 'sleep-1',
            zone: 'sleep',
            difficulty: 'basic',
            text: 'What is the recommended amount of sleep for most adults?',
            options: ['5-6 hours', '7-9 hours', '10-12 hours', '4-5 hours'],
            correctIndex: 1,
            explanation: 'Most adults need 7-9 hours of sleep per night for optimal health and cognitive function.',
            xpValue: 10
        },
        {
            id: 'sleep-2',
            zone: 'sleep',
            difficulty: 'core',
            text: 'Which of these activities helps improve sleep quality?',
            options: ['Using phone in bed', 'Keeping room cool', 'Drinking coffee at night', 'Eating heavy meals before bed'],
            correctIndex: 1,
            explanation: 'A cool room temperature (around 65-68°F) promotes better sleep by supporting the body\'s natural temperature drop during sleep.',
            xpValue: 20
        },
        {
            id: 'sleep-3',
            zone: 'sleep',
            difficulty: 'challenge',
            text: 'What is sleep debt?',
            options: ['Money owed to a sleep clinic', 'The cumulative effect of not getting enough sleep', 'A type of sleeping disorder', 'The time it takes to fall asleep'],
            correctIndex: 1,
            explanation: 'Sleep debt is the accumulated difference between the amount of sleep you need and the amount you actually get, which can impair cognitive and physical performance.',
            xpValue: 30
        }
    ],
    stress: [
        {
            id: 'stress-1',
            zone: 'stress',
            difficulty: 'basic',
            text: 'Which breathing technique is most effective for reducing immediate stress?',
            options: ['Rapid shallow breathing', 'Deep belly breathing', 'Holding your breath', 'Breathing only through mouth'],
            correctIndex: 1,
            explanation: 'Deep belly breathing activates the parasympathetic nervous system, which helps calm the body and reduce stress hormones.',
            xpValue: 10
        },
        {
            id: 'stress-2',
            zone: 'stress',
            difficulty: 'core',
            text: 'What is the "fight or flight" response?',
            options: ['A travel decision', 'The body\'s automatic stress reaction', 'A type of exercise', 'A mental health condition'],
            correctIndex: 1,
            explanation: 'The fight or flight response is the body\'s automatic physiological reaction to perceived threats, releasing hormones like adrenaline and cortisol.',
            xpValue: 20
        },
        {
            id: 'stress-3',
            zone: 'stress',
            difficulty: 'challenge',
            text: 'Which activity is proven to reduce stress levels?',
            options: ['Skipping meals', 'Regular exercise', 'Avoiding sleep', 'Staying indoors always'],
            correctIndex: 1,
            explanation: 'Regular exercise reduces stress hormones like cortisol and stimulates production of endorphins, the body\'s natural mood elevators.',
            xpValue: 30
        }
    ],
    nutrition: [
        {
            id: 'nutrition-1',
            zone: 'nutrition',
            difficulty: 'basic',
            text: 'What are macronutrients?',
            options: ['Large vitamins', 'Carbohydrates, proteins, and fats', 'Food additives', 'Artificial sweeteners'],
            correctIndex: 1,
            explanation: 'Macronutrients (carbohydrates, proteins, and fats) are nutrients needed in large amounts that provide energy and support bodily functions.',
            xpValue: 10
        },
        {
            id: 'nutrition-2',
            zone: 'nutrition',
            difficulty: 'core',
            text: 'Why is fiber important in your diet?',
            options: ['It makes food taste better', 'It supports digestive health', 'It increases sugar absorption', 'It prevents all diseases'],
            correctIndex: 1,
            explanation: 'Fiber promotes healthy digestion, helps maintain stable blood sugar levels, and supports heart health by lowering cholesterol.',
            xpValue: 20
        },
        {
            id: 'nutrition-3',
            zone: 'nutrition',
            difficulty: 'challenge',
            text: 'What is a balanced plate?',
            options: ['All carbohydrates', 'Half vegetables, quarter protein, quarter grains', 'Only fruits', 'Mostly processed foods'],
            correctIndex: 1,
            explanation: 'A balanced plate typically consists of half vegetables/fruits, a quarter lean protein, and a quarter whole grains for optimal nutrition.',
            xpValue: 30
        }
    ],
    movement: [
        {
            id: 'movement-1',
            zone: 'movement',
            difficulty: 'basic',
            text: 'How much moderate exercise do adults need per week?',
            options: ['30 minutes total', '150 minutes', '500 minutes', 'No specific amount'],
            correctIndex: 1,
            explanation: 'The WHO recommends at least 150 minutes of moderate-intensity aerobic activity per week for adults to maintain good health.',
            xpValue: 10
        },
        {
            id: 'movement-2',
            zone: 'movement',
            difficulty: 'core',
            text: 'What is the benefit of strength training?',
            options: ['Only builds large muscles', 'Improves bone density and metabolism', 'Makes you gain weight', 'Reduces flexibility'],
            correctIndex: 1,
            explanation: 'Strength training improves bone density, increases metabolism, supports joint health, and helps maintain muscle mass as we age.',
            xpValue: 20
        },
        {
            id: 'movement-3',
            zone: 'movement',
            difficulty: 'challenge',
            text: 'Why is stretching important?',
            options: ['It burns calories', 'It improves flexibility and reduces injury risk', 'It builds muscle mass', 'It replaces cardio exercise'],
            correctIndex: 1,
            explanation: 'Regular stretching improves flexibility, increases range of motion, enhances circulation, and can help prevent injuries during physical activity.',
            xpValue: 30
        }
    ],
    hydration: [
        {
            id: 'hydration-1',
            zone: 'hydration',
            difficulty: 'basic',
            text: 'What percentage of the human body is water?',
            options: ['30%', '45%', '60%', '80%'],
            correctIndex: 2,
            explanation: 'The human body is approximately 60% water, which is essential for all bodily functions including temperature regulation and nutrient transport.',
            xpValue: 10
        },
        {
            id: 'hydration-2',
            zone: 'hydration',
            difficulty: 'core',
            text: 'Which is a sign of dehydration?',
            options: ['Clear urine', 'Dark yellow urine', 'Excessive energy', 'Improved focus'],
            correctIndex: 1,
            explanation: 'Dark yellow urine is a common sign of dehydration, indicating that your body needs more water to properly dilute waste products.',
            xpValue: 20
        },
        {
            id: 'hydration-3',
            zone: 'hydration',
            difficulty: 'challenge',
            text: 'When should you drink water?',
            options: ['Only when very thirsty', 'Throughout the day', 'Only at meals', 'Only after exercise'],
            correctIndex: 1,
            explanation: 'It\'s best to drink water consistently throughout the day rather than waiting until you\'re thirsty, as thirst is already a sign of mild dehydration.',
            xpValue: 30
        }
    ],
    mindset: [
        {
            id: 'mindset-1',
            zone: 'mindset',
            difficulty: 'basic',
            text: 'What is a growth mindset?',
            options: ['Believing abilities can be developed', 'Thinking you know everything', 'Avoiding challenges', 'Giving up easily'],
            correctIndex: 0,
            explanation: 'A growth mindset is the belief that abilities and intelligence can be developed through effort, learning, and persistence.',
            xpValue: 10
        },
        {
            id: 'mindset-2',
            zone: 'mindset',
            difficulty: 'core',
            text: 'What is mindfulness?',
            options: ['Never thinking', 'Being present in the moment', 'Constant worrying', 'Multitasking'],
            correctIndex: 1,
            explanation: 'Mindfulness is the practice of being fully present and engaged in the current moment, without judgment, which reduces stress and improves well-being.',
            xpValue: 20
        },
        {
            id: 'mindset-3',
            zone: 'mindset',
            difficulty: 'challenge',
            text: 'Why is gratitude practice beneficial?',
            options: ['It makes problems disappear', 'It improves mental well-being and perspective', 'It prevents all negative emotions', 'It requires no effort'],
            correctIndex: 1,
            explanation: 'Regular gratitude practice has been shown to improve mental well-being, increase positive emotions, and help maintain a balanced perspective on life.',
            xpValue: 30
        }
    ]
};

export { QUESTIONS };

console.log('Health Quest data loaded');

// Example shape
{
  id: 'sleep-basic-1',
  zone: 'sleep',
  difficulty: 'basic',   // 'basic' | 'core' | 'challenge'
  question: '...',
  choices: ['...', '...', '...', '...'],
  correctIndex: 1,
  explanation: '...',
  xpValue: 10            // basic: 10, core: 20, challenge: 30
}

{
  id: 'sleep-basic-1',
  zone: 'sleep',
  difficulty: 'basic',
  question: 'You want to fall asleep more easily most nights. What is usually the best evening habit?',
  choices: [
    'Keep all the lights bright until the moment you go to bed',
    'Dim the lights and slow down for 30–60 minutes before bed',
    'Drink a strong coffee after dinner',
    'Check work email in bed'
  ],
  correctIndex: 1,
  explanation: 'Lower light and a calmer pace in the evening help your body start the process of winding down for sleep.',
  xpValue: 10
},
{
  id: 'sleep-basic-2',
  zone: 'sleep',
  difficulty: 'basic',
  question: 'What is one simple way to help your body feel sleepy at night?',
  choices: [
    'Go to bed at a very different time every night',
    'Have a rough but steady bedtime and wake time most days',
    'Stay in bed all day to rest up',
    'Take long naps late in the afternoon'
  ],
  correctIndex: 1,
  explanation: 'A fairly steady sleep and wake time helps your internal clock know when it is time to wind down.',
  xpValue: 10
},
{
  id: 'sleep-basic-3',
  zone: 'sleep',
  difficulty: 'basic',
  question: 'If you wake up at 3 AM and feel wide awake, what is usually the most sleep friendly option?',
  choices: [
    'Turn on bright lights and scroll your phone',
    'Get out of bed, keep lights low, and do something calm until you feel sleepy again',
    'Drink an energy drink so you feel less tired',
    'Start cleaning the house'
  ],
  correctIndex: 1,
  explanation: 'Staying in low light and doing something calm helps you drift back toward sleep without waking your brain up more.',
  xpValue: 10
}

{
  id: 'sleep-core-1',
  zone: 'sleep',
  difficulty: 'core',
  question: 'You often feel wired at night. Which change is most likely to help over the next week?',
  choices: [
    'Cut off caffeine earlier in the day',
    'Only sleep in on weekends',
    'Add extra screen time in bed',
    'Skip breakfast every day'
  ],
  correctIndex: 0,
  explanation: 'Caffeine later in the day can still be active at night and make it harder to fall asleep.',
  xpValue: 20
},
{
  id: 'sleep-core-2',
  zone: 'sleep',
  difficulty: 'core',
  question: 'You want to wake up less groggy. Which habit is often the best first step?',
  choices: [
    'Hit snooze several times every morning',
    'Expose your eyes to natural light soon after waking',
    'Stay in a dark room for hours after waking',
    'Drink only energy drinks instead of breakfast'
  ],
  correctIndex: 1,
  explanation: 'Light soon after waking helps reset your internal clock and signal that it is time to be alert.',
  xpValue: 20
},
{
  id: 'sleep-core-3',
  zone: 'sleep',
  difficulty: 'core',
  question: 'Your schedule is busy and sleep is all over the place. What is a realistic first step?',
  choices: [
    'Try to jump straight to 9 hours every night',
    'Pick one or two nights to protect as your main sleep anchors',
    'Ignore sleep completely and hope it fixes itself',
    'Only sleep in when you feel exhausted'
  ],
  correctIndex: 1,
  explanation: 'Protecting even one or two nights a week as your steady sleep anchors can start to improve how you feel.',
  xpValue: 20
}

{
  id: 'sleep-challenge-1',
  zone: 'sleep',
  difficulty: 'challenge',
  question: 'You currently sleep 5 hours on work nights and feel drained. What is the most realistic first target?',
  choices: [
    'Jump to 9 hours right away',
    'Aim for about 30–60 more minutes of sleep most nights',
    'Cut sleep to 4 hours so you get more done',
    'Only sleep in on weekends and keep weekdays the same'
  ],
  correctIndex: 1,
  explanation: 'Small, steady increases in sleep time are more realistic than sudden large changes for most people.',
  xpValue: 30
},
{
  id: 'sleep-challenge-2',
  zone: 'sleep',
  difficulty: 'challenge',
  question: 'You fall asleep on the couch every night with the TV on. Which change is most likely to improve your sleep quality?',
  choices: [
    'Keep the TV on all night so you do not wake up',
    'Set a time to turn off screens and move to bed on purpose',
    'Drink more soda to stay asleep',
    'Sleep with all the lights on'
  ],
  correctIndex: 1,
  explanation: 'Moving to bed and cutting screens at a set time helps your body associate bed with real sleep, not random dozing.',
  xpValue: 30
},
{
  id: 'sleep-challenge-3',
  zone: 'sleep',
  difficulty: 'challenge',
  question: 'You feel tired all day and wired at night. What paired habit can slowly shift this pattern?',
  choices: [
    'Stay inside with low light in the morning and bright light at night',
    'More morning light and a darker, calmer evening',
    'Use loud alarms all night long',
    'Eat heavy meals right before bed every night'
  ],
  correctIndex: 1,
  explanation: 'More light in the morning and less light at night helps your internal clock line up better with your day.',
  xpValue: 30
}

{
  id: 'stress-basic-1',
  zone: 'stress',
  difficulty: 'basic',
  question: 'You notice your shoulders are tense and jaw is tight. What is one simple thing you can do in the moment?',
  choices: [
    'Hold your breath and ignore it',
    'Take 5 slow breaths with longer exhales',
    'Drink three strong coffees',
    'Scroll social media as fast as you can'
  ],
  correctIndex: 1,
  explanation: 'Slow, longer exhales can help shift your nervous system toward a calmer state.',
  xpValue: 10
},
{
  id: 'stress-basic-2',
  zone: 'stress',
  difficulty: 'basic',
  question: 'You feel stressed at your desk. What quick change often helps?',
  choices: [
    'Sit completely still for hours',
    'Take a short walk or stand up and stretch',
    'Skip water for the whole day',
    'Add more tabs and alerts on your screen'
  ],
  correctIndex: 1,
  explanation: 'Short movement breaks can lower tension and help reset your focus.',
  xpValue: 10
},
{
  id: 'stress-basic-3',
  zone: 'stress',
  difficulty: 'basic',
  question: 'You are overwhelmed by tasks. What is a simple first step?',
  choices: [
    'Try to do everything at once',
    'Pick one small task and do just that for a few minutes',
    'Add more random tasks to the list',
    'Give up and do nothing for weeks'
  ],
  correctIndex: 1,
  explanation: 'Breaking things down and starting with one small task can lower the sense of overload.',
  xpValue: 10
}

{
  id: 'stress-core-1',
  zone: 'stress',
  difficulty: 'core',
  question: 'You notice you feel constantly “on edge”. Which habit can help over time?',
  choices: [
    'Only react when stress explodes',
    'Schedule brief check in breaks during the day to notice how tense you feel',
    'Ignore your body completely',
    'Drink more energy drinks'
  ],
  correctIndex: 1,
  explanation: 'Regular check ins help you catch stress earlier and respond before it builds too high.',
  xpValue: 20
},
{
  id: 'stress-core-2',
  zone: 'stress',
  difficulty: 'core',
  question: 'You calm down with a breath exercise once and feel better. What is the best next step?',
  choices: [
    'Never use it again',
    'Use that tool on purpose a few times each day for a week',
    'Only use it when you feel perfectly fine',
    'Use it once a year'
  ],
  correctIndex: 1,
  explanation: 'Repeating a simple calming tool helps your body learn to shift out of high tension more easily.',
  xpValue: 20
},
{
  id: 'stress-core-3',
  zone: 'stress',
  difficulty: 'core',
  question: 'You feel drained by stress at work. Which boundary is often a realistic first experiment?',
  choices: [
    'Answer every message instantly, no matter the time',
    'Set one small window to step away from your screen daily',
    'Never take any breaks at all',
    'Stay late every night with no end'
  ],
  correctIndex: 1,
  explanation: 'Even one protected break time can start to lower overall stress load across the day.',
  xpValue: 20
}

{
  id: 'stress-challenge-1',
  zone: 'stress',
  difficulty: 'challenge',
  question: 'You are under long term stress and cannot change everything at once. Which approach is often most sustainable?',
  choices: [
    'Try to fix every stress source in one week',
    'Pick one stress pattern to work on first, such as your evening wind down',
    'Ignore stress completely',
    'Blame yourself for feeling stressed'
  ],
  correctIndex: 1,
  explanation: 'Focusing on one doable change makes it more likely you will stick with it.',
  xpValue: 30
},
{
  id: 'stress-challenge-2',
  zone: 'stress',
  difficulty: 'challenge',
  question: 'You feel stressed and reach for your phone without thinking. What is a helpful experiment?',
  choices: [
    'Notice the urge and try one other quick coping tool before your phone',
    'Force yourself to never touch your phone again',
    'Use five devices at once',
    'Do nothing and hope it changes'
  ],
  correctIndex: 0,
  explanation: 'Swapping in a different calming action at least once builds more flexible responses to stress.',
  xpValue: 30
},
{
  id: 'stress-challenge-3',
  zone: 'stress',
  difficulty: 'challenge',
  question: 'Your week is stressful and you cannot take a full day off. What strategy often helps protect your energy?',
  choices: [
    'Say yes to every request',
    'Decide what your “bare minimum” stress care looks like and stick to it',
    'Drop all routines and see what happens',
    'Only focus on other people'
  ],
  correctIndex: 1,
  explanation: 'A simple bare minimum plan helps you care for yourself even during busy times.',
  xpValue: 30
}

{
  id: 'nutrition-basic-1',
  zone: 'nutrition',
  difficulty: 'basic',
  question: 'You want a snack that keeps you full longer. Which is usually the better choice?',
  choices: [
    'Candy only',
    'Yogurt with nuts or seeds',
    'Soda only',
    'Chips and soda only'
  ],
  correctIndex: 1,
  explanation: 'Snacks with some protein and fat tend to keep you full longer than sugar alone.',
  xpValue: 10
},
{
  id: 'nutrition-basic-2',
  zone: 'nutrition',
  difficulty: 'basic',
  question: 'You often skip meals then overeat at night. What is a simple step to try?',
  choices: [
    'Continue skipping meals and hope it changes',
    'Add one small, simple meal earlier in the day',
    'Only eat late at night',
    'Never eat when you are hungry'
  ],
  correctIndex: 1,
  explanation: 'Adding one steady meal earlier can reduce the extreme hunger that leads to overeating later.',
  xpValue: 10
},
{
  id: 'nutrition-basic-3',
  zone: 'nutrition',
  difficulty: 'basic',
  question: 'You want to build more balanced meals. What is an easy rule of thumb?',
  choices: [
    'Only eat foods from one group',
    'Include a source of protein and something with fiber when you can',
    'Only eat foods that are white',
    'Never eat fruit'
  ],
  correctIndex: 1,
  explanation: 'Including protein and fiber can help you feel more full and steady between meals.',
  xpValue: 10
}

{
  id: 'nutrition-core-1',
  zone: 'nutrition',
  difficulty: 'core',
  question: 'You want more protein without counting every gram. What is a simple starting point?',
  choices: [
    'Only eat protein once a week',
    'Include a visible source of protein in 1–2 meals per day',
    'Avoid protein completely',
    'Only drink protein shakes all day'
  ],
  correctIndex: 1,
  explanation: 'Adding a clear protein source to a couple of meals can move you in a better direction without being extreme.',
  xpValue: 20
},
{
  id: 'nutrition-core-2',
  zone: 'nutrition',
  difficulty: 'core',
  question: 'You eat out often and want one small upgrade. Which choice usually helps?',
  choices: [
    'Add a side of vegetables or salad more often',
    'Always super size the fries',
    'Skip all food during the day',
    'Only eat dessert'
  ],
  correctIndex: 0,
  explanation: 'Adding vegetables or a salad can gently increase fiber and volume without changing everything.',
  xpValue: 20
},
{
  id: 'nutrition-core-3',
  zone: 'nutrition',
  difficulty: 'core',
  question: 'You snack late because you skipped dinner. What is a more helpful long term pattern?',
  choices: [
    'Keep skipping dinner and snacking heavily at night',
    'Plan a simple, steady dinner most nights',
    'Only eat at midnight',
    'Never eat with other people'
  ],
  correctIndex: 1,
  explanation: 'A steady evening meal can reduce late night grazing and help your energy feel more even.',
  xpValue: 20
}

{
  id: 'nutrition-challenge-1',
  zone: 'nutrition',
  difficulty: 'challenge',
  question: 'You want to eat “healthier” but feel overwhelmed by strict plans. What is a realistic first move?',
  choices: [
    'Follow the strictest plan you can find overnight',
    'Pick one meal of the day to improve and keep the rest the same for now',
    'Completely stop eating for several days',
    'Switch diets every two days'
  ],
  correctIndex: 1,
  explanation: 'Improving one meal first is more sustainable than trying to overhaul everything at once.',
  xpValue: 30
},
{
  id: 'nutrition-challenge-2',
  zone: 'nutrition',
  difficulty: 'challenge',
  question: 'You often graze at night when stressed, not hungry. What experiment can help?',
  choices: [
    'Notice the urge and try a non food coping tool first some nights',
    'Force yourself to never eat again',
    'Hide all food permanently',
    'Only eat standing up'
  ],
  correctIndex: 0,
  explanation: 'Trying another coping tool first can help you tell the difference between stress and real hunger.',
  xpValue: 30
},
{
  id: 'nutrition-challenge-3',
  zone: 'nutrition',
  difficulty: 'challenge',
  question: 'You want more fiber but hate strict counting. What gentle target can you try?',
  choices: [
    'Add a fruit or vegetable to one or two meals most days',
    'Only eat fiber supplements all day',
    'Avoid fiber completely',
    'Only eat one large meal per week'
  ],
  correctIndex: 0,
  explanation: 'Adding produce to some meals is an easier way to increase fiber than strict tracking for many people.',
  xpValue: 30
}

{
  id: 'movement-basic-1',
  zone: 'movement',
  difficulty: 'basic',
  question: 'You sit most of the day. What is a simple way to start moving more?',
  choices: [
    'Wait until you can do a 90 minute workout',
    'Stand up and walk for 2–3 minutes each hour',
    'Avoid all movement to save energy',
    'Only move on holidays'
  ],
  correctIndex: 1,
  explanation: 'Short, regular movement breaks are an easy way to start adding activity.',
  xpValue: 10
},
{
  id: 'movement-basic-2',
  zone: 'movement',
  difficulty: 'basic',
  question: 'You have low energy and have not moved much. What is a gentle starting point?',
  choices: [
    'A slow 5–10 minute walk',
    'A full marathon today',
    'Hundreds of push ups right away',
    'No movement at all'
  ],
  correctIndex: 0,
  explanation: 'Short and gentle movement is often a realistic first step when energy feels low.',
  xpValue: 10
},
{
  id: 'movement-basic-3',
  zone: 'movement',
  difficulty: 'basic',
  question: 'You want to stretch more but always forget. What might help?',
  choices: [
    'Attach a short stretch to something you already do, like after brushing your teeth',
    'Wait for a perfect time and perfect space',
    'Only stretch for an hour at a time',
    'Never stretch again'
  ],
  correctIndex: 0,
  explanation: 'Adding a short stretch to an existing habit makes it easier to remember.',
  xpValue: 10
}

{
  id: 'movement-core-1',
  zone: 'movement',
  difficulty: 'core',
  question: 'You want to feel stronger over time. What is a simple target?',
  choices: [
    'One or two short strength sessions per week',
    'One extreme workout then nothing for months',
    'Only random stretching',
    'Never move your muscles'
  ],
  correctIndex: 0,
  explanation: 'Even a couple of strength sessions per week can build strength over time.',
  xpValue: 20
},
{
  id: 'movement-core-2',
  zone: 'movement',
  difficulty: 'core',
  question: 'You already walk a lot but still feel stiff. What might help?',
  choices: [
    'Add some simple strength or mobility work',
    'Stop walking completely',
    'Only sit in one position all day',
    'Drink more soda only'
  ],
  correctIndex: 0,
  explanation: 'Strength and mobility training can address stiffness that walking alone does not.',
  xpValue: 20
},
{
  id: 'movement-core-3',
  zone: 'movement',
  difficulty: 'core',
  question: 'You keep quitting workout plans. What is a more flexible approach?',
  choices: [
    'Create a “bare minimum” movement plan for busy days and a “full” plan for open days',
    'Only exercise when you feel perfect',
    'Quit as soon as you miss one day',
    'Do five hours a day then stop completely'
  ],
  correctIndex: 0,
  explanation: 'Having a bare minimum and a full version makes it easier to stay consistent across real life changes.',
  xpValue: 20
}

{
  id: 'movement-challenge-1',
  zone: 'movement',
  difficulty: 'challenge',
  question: 'You have a packed schedule. What is a realistic way to get more movement in a workday?',
  choices: [
    'Walk or stand for short parts of calls and transitions',
    'Wait for a completely free day to start moving again',
    'Do all your steps only on weekends',
    'Avoid leaving your chair at all'
  ],
  correctIndex: 0,
  explanation: 'Using small pockets of time during your day can add up to meaningful movement.',
  xpValue: 30
},
{
  id: 'movement-challenge-2',
  zone: 'movement',
  difficulty: 'challenge',
  question: 'You feel pressure to do intense workouts, but your body feels worn down. What is a wiser move?',
  choices: [
    'Scale back to lighter movement that feels doable and see how your energy responds',
    'Push as hard as possible every day',
    'Stop all movement long term',
    'Compare yourself to everyone online'
  ],
  correctIndex: 0,
  explanation: 'Adjusting intensity to your current capacity helps you stay active without burning out.',
  xpValue: 30
},
{
  id: 'movement-challenge-3',
  zone: 'movement',
  difficulty: 'challenge',
  question: 'You want to keep exercise going long term. Which mindset supports that best?',
  choices: [
    '“If I miss one day, I failed and should quit.”',
    '“Some weeks will be lighter. I can adjust and come back.”',
    '“Only perfection counts.”',
    '“Movement only matters during New Year.”'
  ],
  correctIndex: 1,
  explanation: 'Seeing movement as flexible makes it more likely you will stay with it over years.',
  xpValue: 30
}

{
  id: 'hydration-basic-1',
  zone: 'hydration',
  difficulty: 'basic',
  question: 'You often forget to drink water. What is a simple fix?',
  choices: [
    'Keep a water bottle near you and sip through the day',
    'Only drink water once a week',
    'Only drink very sugary drinks',
    'Wait until you feel extremely unwell'
  ],
  correctIndex: 0,
  explanation: 'Having water in sight and easy to reach makes it more likely you will drink it.',
  xpValue: 10
},
{
  id: 'hydration-basic-2',
  zone: 'hydration',
  difficulty: 'basic',
  question: 'You are mildly thirsty most afternoons. Which habit can help?',
  choices: [
    'Start the day with some water',
    'Never drink in the morning',
    'Only drink at night',
    'Only drink drinks that dehydrate you'
  ],
  correctIndex: 0,
  explanation: 'Starting the day with water can help you feel better hydrated overall.',
  xpValue: 10
},
{
  id: 'hydration-basic-3',
  zone: 'hydration',
  difficulty: 'basic',
  question: 'You are choosing between drinks. Which option usually supports hydration best?',
  choices: [
    'Plain water most of the time',
    'Very sugary drinks only',
    'Energy drinks only',
    'Drinks with large amounts of alcohol'
  ],
  correctIndex: 0,
  explanation: 'Plain water is often the simplest way to support hydration.',
  xpValue: 10
}

{
  id: 'hydration-core-1',
  zone: 'hydration',
  difficulty: 'core',
  question: 'You drink almost nothing at work and feel foggy. What is a realistic habit?',
  choices: [
    'Set a gentle reminder or routine to drink a bit every few hours',
    'Chug huge amounts only once a week',
    'Never drink while working',
    'Replace all fluids with soda only'
  ],
  correctIndex: 0,
  explanation: 'Regular small amounts are easier on your body and help steady energy and focus.',
  xpValue: 20
},
{
  id: 'hydration-core-2',
  zone: 'hydration',
  difficulty: 'core',
  question: 'You want to cut back on sugary drinks without feeling deprived. What might help?',
  choices: [
    'Switch all at once to only plain water with no plan',
    'Swap one sugary drink for water or a lower sugar option to start',
    'Add more sugar to every drink',
    'Completely stop drinking fluids'
  ],
  correctIndex: 1,
  explanation: 'Swapping one drink at a time is often more realistic than a full overhaul at once.',
  xpValue: 20
},
{
  id: 'hydration-core-3',
  zone: 'hydration',
  difficulty: 'core',
  question: 'You notice mild headaches and darker urine during the day. What simple step may help?',
  choices: [
    'Drink some water earlier and more regularly',
    'Avoid all fluids',
    'Only drink strong alcohol',
    'Only drink before bed'
  ],
  correctIndex: 0,
  explanation: 'Regular water intake can improve mild dehydration signs for many people.',
  xpValue: 20
}

{
  id: 'hydration-challenge-1',
  zone: 'hydration',
  difficulty: 'challenge',
  question: 'Your schedule is busy and you skip water to avoid bathroom breaks. What is a healthier balance?',
  choices: [
    'Plan a few small water breaks and bathroom trips rather than avoiding fluids all day',
    'Avoid all fluids for the entire workday',
    'Only drink huge amounts right before bed',
    'Stop drinking water completely long term'
  ],
  correctIndex: 0,
  explanation: 'Some planned breaks allow you to stay hydrated without feeling out of control.',
  xpValue: 30
},
{
  id: 'hydration-challenge-2',
  zone: 'hydration',
  difficulty: 'challenge',
  question: 'You want to pay more attention to hydration for one week. What is a simple experiment?',
  choices: [
    'Notice how you feel on days you drink more water versus much less',
    'Track every milliliter all day with no break',
    'Only drink when you feel very ill',
    'Never think about your body’s signals'
  ],
  correctIndex: 0,
  explanation: 'Comparing how you feel on different days can show you what actually helps you.',
  xpValue: 30
},
{
  id: 'hydration-challenge-3',
  zone: 'hydration',
  difficulty: 'challenge',
  question: 'You rely heavily on caffeine drinks. What is a more balanced habit?',
  choices: [
    'Match some of your caffeinated drinks with water across the day',
    'Only drink extra caffeine and no water',
    'Double your caffeine every week',
    'Never drink any fluids'
  ],
  correctIndex: 0,
  explanation: 'Balancing caffeine with water helps you stay more hydrated overall.',
  xpValue: 30
}

{
  id: 'mindset-basic-1',
  zone: 'mindset',
  difficulty: 'basic',
  question: 'You missed two planned workouts. Which thought is most helpful?',
  choices: [
    '“I always fail. I should quit.”',
    '“Two days do not erase my progress. I can start again tomorrow.”',
    '“I am the worst person alive.”',
    '“Health is only for perfect people.”'
  ],
  correctIndex: 1,
  explanation: 'Seeing slips as normal makes it easier to get back on track.',
  xpValue: 10
},
{
  id: 'mindset-basic-2',
  zone: 'mindset',
  difficulty: 'basic',
  question: 'You want to be “healthy” but feel far behind. What mindset helps you move forward?',
  choices: [
    '“There is no point in trying.”',
    '“Small steps still count and can build over time.”',
    '“Only big dramatic changes matter.”',
    '“If I cannot do it perfectly, I should not start.”'
  ],
  correctIndex: 1,
  explanation: 'Small steps let you start where you are instead of waiting for perfect conditions.',
  xpValue: 10
},
{
  id: 'mindset-basic-3',
  zone: 'mindset',
  difficulty: 'basic',
  question: 'You compare yourself to people who seem much fitter. What is a more helpful focus?',
  choices: [
    'How your body looks compared to others',
    'Your own next step that fits your life',
    'Only what strangers think',
    'Only extreme results'
  ],
  correctIndex: 1,
  explanation: 'Focusing on your own next step makes progress feel more possible.',
  xpValue: 10
}

{
  id: 'mindset-core-1',
  zone: 'mindset',
  difficulty: 'core',
  question: 'You tend to think in “all or nothing” terms. What rewrite is more helpful?',
  choices: [
    '“If I cannot do everything, I might as well do nothing.”',
    '“Doing part of the plan still moves me forward.”',
    '“One missed day erases all progress.”',
    '“Health only counts if it is perfect.”'
  ],
  correctIndex: 1,
  explanation: 'Seeing middle ground choices as progress keeps you consistent.',
  xpValue: 20
},
{
  id: 'mindset-core-2',
  zone: 'mindset',
  difficulty: 'core',
  question: 'You talk to yourself harshly about health. Which new voice is more useful?',
  choices: [
    'One that shames you constantly',
    'One that speaks like a firm but kind coach',
    'One that calls you names',
    'One that gives up easily'
  ],
  correctIndex: 1,
  explanation: 'Supportive self talk makes it easier to try again rather than shut down.',
  xpValue: 20
},
{
  id: 'mindset-core-3',
  zone: 'mindset',
  difficulty: 'core',
  question: 'You are tempted to stack too many goals at once. What is a wiser plan?',
  choices: [
    'Change sleep, food, movement, and work all in one week',
    'Pick one or two health goals and practice them until they feel easier',
    'Start ten strict plans at once',
    'Wait until life is perfect to start anything'
  ],
  correctIndex: 1,
  explanation: 'Fewer goals done consistently often beat many goals done briefly.',
  xpValue: 20
}

{
  id: 'mindset-challenge-1',
  zone: 'mindset',
  difficulty: 'challenge',
  question: 'Life keeps throwing curveballs into your health plans. What mindset protects your progress?',
  choices: [
    '“If life is not perfect, I cannot do anything.”',
    '“I can shrink my plan during hard weeks instead of dropping it completely.”',
    '“Only big dramatic seasons count.”',
    '“Other people’s routines are the only way.”'
  ],
  correctIndex: 1,
  explanation: 'Having a smaller backup version of your plan keeps you moving even when life is messy.',
  xpValue: 30
},
{
  id: 'mindset-challenge-2',
  zone: 'mindset',
  difficulty: 'challenge',
  question: 'You feel like health tools have failed you before. What is a grounded way to look at trying again?',
  choices: [
    '“Nothing will ever work, so I should stop.”',
    '“Some tools were not a fit. I can test new ones and keep what actually helps me.”',
    '“It is all my fault.”',
    '“I must copy someone else exactly.”'
  ],
  correctIndex: 1,
  explanation: 'Viewing health tools as experiments lets you keep what works instead of blaming yourself.',
  xpValue: 30
},
{
  id: 'mindset-challenge-3',
  zone: 'mindset',
  difficulty: 'challenge',
  question: 'Your friends and family do not care about health. What viewpoint helps you stick with your own choices?',
  choices: [
    '“I must match what everyone around me does.”',
    '“I am allowed to care about my health even if the people around me do not.”',
    '“My efforts only matter if others approve.”',
    '“I should hide anything healthy I do.”'
  ],
  correctIndex: 1,
  explanation: 'Owning your own reasons for change makes it more likely you will continue over time.',
  xpValue: 30
}

const ACHIEVEMENTS = [
  {
    id: 'first-correct',
    name: 'First Spark',
    description: 'You answered your first Health Quest tile.',
    unlockToast: 'Nice start. First tile complete.'
  },
  {
    id: 'sleep-rookie',
    name: 'Sleep Rookie',
    description: 'You completed 3 sleep tiles.',
    unlockToast: 'Sleep Rookie unlocked. You are starting to understand your nights.'
  },
  {
    id: 'hydration-hero',
    name: 'Hydration Hero',
    description: 'You completed 10 hydration tiles.',
    unlockToast: 'Hydration Hero unlocked. Your body will thank you for the water.'
  },
  {
    id: 'seven-day-streak',
    name: 'Seven Day Streak',
    description: 'You played Health Quest 7 days in a row.',
    unlockToast: 'Seven days straight. That is real consistency.'
  },
  {
    id: 'map-clear',
    name: 'Quest Path Complete',
    description: 'You cleared every node on the Health Quest path.',
    unlockToast: 'You reached the end of the path. Time to replay and level your skills even higher.'
  },
  {
    id: 'mixed-master',
    name: 'Mixed Zone Master',
    description: 'You passed a mixed category challenge round.',
    unlockToast: 'Mixed Zone Master unlocked. You can handle real life variety.'
  }
];
