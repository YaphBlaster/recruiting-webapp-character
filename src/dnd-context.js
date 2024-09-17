import { useState } from "react";
import { createContext, useContext } from "react";


export const defaultValues = {
    id: 999,
    attributes: {
        Strength: {
            value: 10,
            modifier: 0
        },
        Dexterity: {
            value: 10,
            modifier: 0
        },
        Constitution: {
            value: 10,
            modifier: 0
        },
        Intelligence: {
            value: 10,
            modifier: 0
        },
        Wisdom: {
            value: 10,
            modifier: 0
        },
        Charisma: {
            value: 10,
            modifier: 0
        },

    },
    skills: {
        Acrobatics: {
            value: 0,
            total: 0
        },
        "Animal Handling": {
            value: 0,
            total: 0
        },
        Arcana: {
            value: 0,
            total: 0
        },
        Athletics: {
            value: 0,
            total: 0
        },
        Deception: {
            value: 0,
            total: 0
        },
        History: {
            value: 0,
            total: 0
        },
        Insight: {
            value: 0,
            total: 0
        },
        Intimidation: {
            value: 0,
            total: 0
        },
        Investigation: {
            value: 0,
            total: 0
        },
        Medicine: {
            value: 0,
            total: 0
        },
        Nature: {
            value: 0,
            total: 0
        },
        Perception: {
            value: 0,
            total: 0
        },
        Performance: {
            value: 0,
            total: 0
        },
        Persuasion: {
            value: 0,
            total: 0
        },
        Religion: {
            value: 0,
            total: 0
        },
        "Sleight of Hand": {
            value: 0,
            total: 0
        },
        Stealth: {
            value: 0,
            total: 0
        },
        Survival: {
            value: 0,
            total: 0
        },
    }

}


export const DndContext = createContext({ characters: [] })


export const useDndContext = () => {
    const dndContext = useContext(DndContext);

    if (!dndContext) {
        throw new Error(
            "useDndContext should be used within <DndProvider>"
        );
    }
    return dndContext;
};

const DndProvider = ({ children }) => {
    const [characters, setCharacters] = useState([{ ...defaultValues }]);

    const alterAttribute = ({
        type,
        characterId,
        attribute
    }) => {
        const characterIndex = characters.findIndex(character => character.id, characterId)
        const character = characters[characterIndex];

        character.attributes[attribute].value += type === "increment" ? 1 : -1;
        character.attributes[attribute].modifier = Math.floor((character.attributes[attribute].value - 10) / 2)

        setCharacters(prevCharacters => [...prevCharacters.splice(characterIndex, 1, character)])

    }


    const alterSkill = ({
        type,
        characterId,
        skill,
        modifierValue
    }) => {
        const characterIndex = characters.findIndex(character => character.id, characterId)
        const character = characters[characterIndex];

        character.skills[skill].value += type === "increment" ? 1 : -1;
        character.skills[skill].total = character.skills[skill].value + modifierValue;

        setCharacters(prevCharacters => [...prevCharacters.splice(characterIndex, 1, character)])

    }


    return (
        <DndContext.Provider
            value={{ characters, alterAttribute, alterSkill }}
        >
            {children}
        </DndContext.Provider >
    );
};

export default DndProvider;
