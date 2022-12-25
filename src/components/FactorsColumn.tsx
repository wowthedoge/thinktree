import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "./Box";
import { ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";

interface Props {
  getRefsList: (refsList: React.RefObject<HTMLDivElement>[]) => void;
  getFactorsList: (newFactors: number[]) => void;
  optionsList: number[];
}

const FactorsColumn: React.FC<Props> = ({
  getRefsList,
  getFactorsList,
  optionsList,
}) => {
  const refsSet = useRef<Set<React.RefObject<HTMLDivElement>>>(new Set());
  const [factorList, setFactorList] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const addRef: (ref: React.RefObject<HTMLDivElement>) => void = (ref) => {
    refsSet.current.add(ref);
  };

  let colorList: string[] = [
    "rgba(206, 129, 121)",
    "rgba(220, 163, 130)",
    "rgba(209, 199, 136)",
    "rgba(143, 185, 140)",
    "rgba(134, 157, 178)",
    "rgba(166, 130, 159)",
  ];
  const colorPicker: (number: number, opacity: number) => string = (
    number,
    opacity
  ) =>
    colorList[(number - 1) % (colorList.length - 1)].replace(
      ")",
      `,${opacity})`
    );

  useEffect(
    () => getRefsList(Array.from(refsSet.current.values())),
    [refsSet, getRefsList]
  );

  const archerRelationsList: (
    color: string,
    selected: boolean
  ) => RelationType[] = (color, selected) =>
    // For drawing the connections
    optionsList.map((o) => ({
      targetId: "option" + o,
      targetAnchor: "left",
      sourceAnchor: "right",
      style: { strokeColor: color, strokeWidth: selected ? 4 : 2 },
      label: selected ? (
        // <div style={{ marginTop: "-30px", color: color }}> a </div>
        <Value color={color} />
      ) : null,
    }));

  const addFactor = () => {
    let newFactorList: number[] = [...factorList, factorList.length + 1];
    setFactorList(newFactorList);
    getFactorsList(newFactorList);
  };

  const boxClicked: (id: number) => void = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="column">
      {factorList.map((d) => (
        <ArcherElement
          key={"factor" + d}
          id={"factor" + d}
          relations={archerRelationsList(
            colorPicker(d, d === selectedId ? 1 : 0.3),
            selectedId === d
          )}
        >
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: colorPicker(d, d === selectedId ? 1 : 0.3),
            }}
          >
            <Box id={d} type="factor" addRef={addRef} boxClicked={boxClicked} />
          </div>
        </ArcherElement>
      ))}

      <button className="add-box-button" onClick={addFactor}>
        +
      </button>
    </div>
  );
};

const Value = (Props: { color: string }) => {
  const [value, setValue] = useState<number | string>("0");

  const updateValue = (
    val: number | "",
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLInputElement>
  ) => {
    e && e.preventDefault();
    setValue(val);
  };

  return (
    //backgroundColor: Props.color, borderRadius:"1rem"
    <div style={{ marginTop: "-35px" }}>
      <input
        style={{ color: Props.color }}
        className="value"
        onFocus={(e) => {
          if (Number((e.target as HTMLInputElement).value === "0"))
            updateValue("", e);
        }}
        value={value}
        onChange={(e) =>
          updateValue(Number((e.target as HTMLInputElement).value), e)
        }
        type="number"
        inputMode="numeric"
      />
    </div>
  );
};

export default FactorsColumn;
