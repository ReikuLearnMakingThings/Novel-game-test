const storyData = {
    "start": [
        { 
            name: "Narrator", 
            text: "The library is quiet today. Only the faint sound of pages turning breaks the silence.",
            bg: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1920"
        },
        { 
            name: "Adachi Rei", 
            text: "Hey! I did not expect to see you here. You look very focused on your Java project today.", 
            sprite: "asset/bg/ab0943169ee0e0a6f39ecdeb50fef6c2.jpg" 
        },
        { 
            name: "System", 
            text: "How would you like to respond to her?", 
            choices: [
                { text: "I wanted to finish this project so we can spend time together.", target: "romance_path" },
                { text: "I just do not want to fail this semester.", target: "cold_path" }
            ] 
        }
    ],
    "romance_path": [
        { name: "Adachi Rei", text: "Together? You should not say such sweet things without thinking... but I do not mind it.", sprite: "asset/bg/ab0943169ee0e0a6f39ecdeb50fef6c2.jpg" },
        { name: "System", text: "ENDING: A Promise in the Library." }
    ],
    "cold_path": [
        { name: "Adachi Rei", text: "That is practical of you. Well, do not overwork yourself. I will be here if you need help.", sprite: "asset/bg/ab0943169ee0e0a6f39ecdeb50fef6c2.jpg" },
        { name: "System", text: "ENDING: The Diligent Student." }
    ]
};