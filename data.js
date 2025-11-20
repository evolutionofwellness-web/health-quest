// Health Quest - Game Data

// Questions data for all zones
export const QUESTIONS = [
    // Sleep Zone Questions
    {
        id: 'sleep-1',
        zone: 'Sleep',
        level: 1,
        xpReward: 10,
        question: 'What is the recommended amount of sleep for most adults?',
        choices: ['5-6 hours', '7-9 hours', '10-12 hours', '4-5 hours'],
        correctIndex: 1,
        explanation: 'Most adults need 7-9 hours of sleep per night for optimal health and cognitive function.'
    },
    {
        id: 'sleep-2',
        zone: 'Sleep',
        level: 1,
        xpReward: 10,
        question: 'Which of these activities helps improve sleep quality?',
        choices: ['Using phone in bed', 'Keeping room cool', 'Drinking coffee at night', 'Eating heavy meals before bed'],
        correctIndex: 1,
        explanation: 'A cool room temperature (around 65-68°F) promotes better sleep by supporting the body\'s natural temperature drop during sleep.'
    },
    {
        id: 'sleep-3',
        zone: 'Sleep',
        level: 2,
        xpReward: 20,
        question: 'What is sleep debt?',
        choices: ['Money owed to a sleep clinic', 'The cumulative effect of not getting enough sleep', 'A type of sleeping disorder', 'The time it takes to fall asleep'],
        correctIndex: 1,
        explanation: 'Sleep debt is the accumulated difference between the amount of sleep you need and the amount you actually get, which can impair cognitive and physical performance.'
    },

    // Stress Zone Questions
    {
        id: 'stress-1',
        zone: 'Stress',
        level: 1,
        xpReward: 10,
        question: 'Which breathing technique is most effective for reducing immediate stress?',
        choices: ['Rapid shallow breathing', 'Deep belly breathing', 'Holding your breath', 'Breathing only through mouth'],
        correctIndex: 1,
        explanation: 'Deep belly breathing activates the parasympathetic nervous system, which helps calm the body and reduce stress hormones.'
    },
    {
        id: 'stress-2',
        zone: 'Stress',
        level: 2,
        xpReward: 20,
        question: 'What is the "fight or flight" response?',
        choices: ['A travel decision', 'The body\'s automatic stress reaction', 'A type of exercise', 'A mental health condition'],
        correctIndex: 1,
        explanation: 'The fight or flight response is the body\'s automatic physiological reaction to perceived threats, releasing hormones like adrenaline and cortisol.'
    },
    {
        id: 'stress-3',
        zone: 'Stress',
        level: 1,
        xpReward: 10,
        question: 'Which activity is proven to reduce stress levels?',
        choices: ['Skipping meals', 'Regular exercise', 'Avoiding sleep', 'Staying indoors always'],
        correctIndex: 1,
        explanation: 'Regular exercise reduces stress hormones like cortisol and stimulates production of endorphins, the body\'s natural mood elevators.'
    },

    // Nutrition Zone Questions
    {
        id: 'nutrition-1',
        zone: 'Nutrition',
        level: 1,
        xpReward: 10,
        question: 'What are macronutrients?',
        choices: ['Large vitamins', 'Carbohydrates, proteins, and fats', 'Food additives', 'Artificial sweeteners'],
        correctIndex: 1,
        explanation: 'Macronutrients (carbohydrates, proteins, and fats) are nutrients needed in large amounts that provide energy and support bodily functions.'
    },
    {
        id: 'nutrition-2',
        zone: 'Nutrition',
        level: 2,
        xpReward: 20,
        question: 'Why is fiber important in your diet?',
        choices: ['It makes food taste better', 'It supports digestive health', 'It increases sugar absorption', 'It prevents all diseases'],
        correctIndex: 1,
        explanation: 'Fiber promotes healthy digestion, helps maintain stable blood sugar levels, and supports heart health by lowering cholesterol.'
    },
    {
        id: 'nutrition-3',
        zone: 'Nutrition',
        level: 1,
        xpReward: 10,
        question: 'What is a balanced plate?',
        choices: ['All carbohydrates', 'Half vegetables, quarter protein, quarter grains', 'Only fruits', 'Mostly processed foods'],
        correctIndex: 1,
        explanation: 'A balanced plate typically consists of half vegetables/fruits, a quarter lean protein, and a quarter whole grains for optimal nutrition.'
    },

    // Movement Zone Questions
    {
        id: 'movement-1',
        zone: 'Movement',
        level: 1,
        xpReward: 10,
        question: 'How much moderate exercise do adults need per week?',
        choices: ['30 minutes total', '150 minutes', '500 minutes', 'No specific amount'],
        correctIndex: 1,
        explanation: 'The WHO recommends at least 150 minutes of moderate-intensity aerobic activity per week for adults to maintain good health.'
    },
    {
        id: 'movement-2',
        zone: 'Movement',
        level: 2,
        xpReward: 20,
        question: 'What is the benefit of strength training?',
        choices: ['Only builds large muscles', 'Improves bone density and metabolism', 'Makes you gain weight', 'Reduces flexibility'],
        correctIndex: 1,
        explanation: 'Strength training improves bone density, increases metabolism, supports joint health, and helps maintain muscle mass as we age.'
    },
    {
        id: 'movement-3',
        zone: 'Movement',
        level: 1,
        xpReward: 10,
        question: 'Why is stretching important?',
        choices: ['It burns calories', 'It improves flexibility and reduces injury risk', 'It builds muscle mass', 'It replaces cardio exercise'],
        correctIndex: 1,
        explanation: 'Regular stretching improves flexibility, increases range of motion, enhances circulation, and can help prevent injuries during physical activity.'
    },

    // Hydration Zone Questions
    {
        id: 'hydration-1',
        zone: 'Hydration',
        level: 1,
        xpReward: 10,
        question: 'What percentage of the human body is water?',
        choices: ['30%', '45%', '60%', '80%'],
        correctIndex: 2,
        explanation: 'The human body is approximately 60% water, which is essential for all bodily functions including temperature regulation and nutrient transport.'
    },
    {
        id: 'hydration-2',
        zone: 'Hydration',
        level: 2,
        xpReward: 20,
        question: 'Which is a sign of dehydration?',
        choices: ['Clear urine', 'Dark yellow urine', 'Excessive energy', 'Improved focus'],
        correctIndex: 1,
        explanation: 'Dark yellow urine is a common sign of dehydration, indicating that your body needs more water to properly dilute waste products.'
    },
    {
        id: 'hydration-3',
        zone: 'Hydration',
        level: 1,
        xpReward: 10,
        question: 'When should you drink water?',
        choices: ['Only when very thirsty', 'Throughout the day', 'Only at meals', 'Only after exercise'],
        correctIndex: 1,
        explanation: 'It\'s best to drink water consistently throughout the day rather than waiting until you\'re thirsty, as thirst is already a sign of mild dehydration.'
    },

    // Mindset Zone Questions
    {
        id: 'mindset-1',
        zone: 'Mindset',
        level: 1,
        xpReward: 10,
        question: 'What is a growth mindset?',
        choices: ['Believing abilities can be developed', 'Thinking you know everything', 'Avoiding challenges', 'Giving up easily'],
        correctIndex: 0,
        explanation: 'A growth mindset is the belief that abilities and intelligence can be developed through effort, learning, and persistence.'
    },
    {
        id: 'mindset-2',
        zone: 'Mindset',
        level: 2,
        xpReward: 20,
        question: 'What is mindfulness?',
        choices: ['Never thinking', 'Being present in the moment', 'Constant worrying', 'Multitasking'],
        correctIndex: 1,
        explanation: 'Mindfulness is the practice of being fully present and engaged in the current moment, without judgment, which reduces stress and improves well-being.'
    },
    {
        id: 'mindset-3',
        zone: 'Mindset',
        level: 1,
        xpReward: 10,
        question: 'Why is gratitude practice beneficial?',
        choices: ['It makes problems disappear', 'It improves mental well-being and perspective', 'It prevents all negative emotions', 'It requires no effort'],
        correctIndex: 1,
        explanation: 'Regular gratitude practice has been shown to improve mental well-being, increase positive emotions, and help maintain a balanced perspective on life.'
    }
];

console.log('Health Quest data loaded');
