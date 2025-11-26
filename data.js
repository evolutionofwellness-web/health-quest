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
