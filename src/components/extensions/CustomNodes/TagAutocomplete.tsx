import React, { useState, useEffect, useRef, useCallback } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Icon } from "@/components/ui/Icon";
import axios, { AxiosResponse } from "axios";
import { icons } from "lucide-react";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

export enum TagAutocompleteVariant {
  Metric = "Metric",
  KpiChain = "KpiChain",
  Playbook = "Playbook",
}

// Types
interface SuggestionItem {
  id: string | number;
  label: string;
}

interface ApiResponse {
  data: SuggestionItem[];
}

interface NodeAttrs {
  text: string;
  bgColor: string;
  color: string;
  variant: "default" | "filled" | "outline";
  icon?: keyof typeof icons;
  selectedId?: string | number | null;
  tagType?: TagAutocompleteVariant;
}

interface TagAutocompleteProps {
  node: ProseMirrorNode;
  updateAttributes: (attrs: Partial<NodeAttrs>) => void;
  selected: boolean;
}

interface VariantStyles {
  backgroundColor?: string;
  color: string;
  border: string;
}

interface BaseStyles {
  display: string;
  alignItems: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
  fontWeight: string;
  cursor: string;
  userSelect: string;
  border: string;
  margin: string;
  position: string;
}

const TagAutocomplete: React.FC<TagAutocompleteProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  console.log("Rendering TagAutocomplete with node:", node.attrs.tagType);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>(node.attrs.text);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(async (query: string): Promise<void> => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(async (): Promise<void> => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        setIsLoading(true);

        // Sostituisci questa URL con la tua API endpoint
        // L'endpoint cambia in base al tagType

        let paramsType = "";
        switch (node.attrs.tagType) {
          case TagAutocompleteVariant.Metric:
            paramsType = "metric";
            break;
          case TagAutocompleteVariant.KpiChain:
            paramsType = "kpi-chain";
            break;
          case TagAutocompleteVariant.Playbook:
            paramsType = "playbook";
            break;
          default:
            console.warn("Unrecognized tagType:", node.attrs.tagType);
            return;
        }
        const endpoint = `/api/autocomplete?q=${encodeURIComponent(query)}&type=${paramsType}&limit=5`;
        /*const response: AxiosResponse<SuggestionItem[]> = await axios.get<
          SuggestionItem[]
        >(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });*/

        // Assumendo che la response sia un array di oggetti con { id, label }
        setSuggestions(/*response.data || */[
          {
            id: "1",
            label: "Esempio 1",
          },
          {
            id: "2",
            label: "Esempio 2",
          },
          {
            id: "3",
            label: "Esempio 3",
          },
          {
            id: "4",
            label: "Esempio 4",
          },
          {
            id: "5",
            label: "Esempio 5",
          }
        ]);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } catch (error: unknown) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms di debounce
  }, []);

  // Cleanup on unmount
  useEffect((): (() => void) => {
    return (): void => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleDoubleClick = (): void => {
    setIsEditing(true);
    setTempText(node.attrs.text);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setTempText(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev: number): number =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev: number): number =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            selectSuggestion(suggestions[selectedIndex]);
          } else {
            // Se non c'è selezione, usa il primo risultato o il testo corrente
            if (suggestions.length > 0) {
              selectSuggestion(suggestions[0]);
            } else {
              finishEditing();
            }
          }
          return;
        case "Tab":
          e.preventDefault();
          if (selectedIndex >= 0) {
            selectSuggestion(suggestions[selectedIndex]);
          } else if (suggestions.length > 0) {
            selectSuggestion(suggestions[0]);
          }
          return;
      }
    }

    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const selectSuggestion = (suggestion: SuggestionItem): void => {
    updateAttributes({
      text: suggestion.label,
      selectedId: suggestion.id, // Salva anche l'ID per uso futuro
    });
    setIsEditing(false);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const finishEditing = (): void => {
    updateAttributes({ text: tempText });
    setIsEditing(false);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const cancelEditing = (): void => {
    setTempText(node.attrs.text);
    setIsEditing(false);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    // Check if the blur is because of clicking on a suggestion
    if (
      suggestionsRef.current &&
      suggestionsRef.current.contains(e.relatedTarget as Node)
    ) {
      return; // Don't close if clicking on suggestion
    }

    setTimeout((): void => {
      finishEditing();
    }, 150); // Small delay to allow suggestion clicks
  };

  const handleSuggestionClick = (suggestion: SuggestionItem): void => {
    selectSuggestion(suggestion);
  };

  const handleMouseEnter = (index: number): void => {
    setSelectedIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault(); // Prevent blur
  };

  const getVariantStyles = (): BaseStyles & VariantStyles => {
    const baseStyles: BaseStyles = {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 8px",
      borderRadius: "100px",
      fontSize: "12px",
      fontWeight: "500",
      cursor: "pointer",
      userSelect: "none",
      border: selected ? "2px transparent" : "none",
      margin: "0 4px",
      position: "relative",
    };

    const variants: Record<NodeAttrs["variant"], VariantStyles> = {
      default: {
        backgroundColor: node.attrs.bgColor,
        color: node.attrs.color,
        border: `1px solid ${node.attrs.color}40`,
      },
      filled: {
        backgroundColor: node.attrs.bgColor,
        color: "white",
        border: "none",
      },
      outline: {
        backgroundColor: "transparent",
        color: node.attrs.color,
        border: `1px solid ${node.attrs.color}`,
      },
    };

    return { ...baseStyles, ...variants[node.attrs.variant] };
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const id = node.attrs.selectedId;
    const tagType = node.attrs.tagType;

    if (!id || !tagType) {
      console.warn("ID or tagType is missing, cannot open URL.");
      return;
    }

    let url = "";

    switch (tagType) {
      case "KpiChain":
        url = `/dashboard/kpi/${id}`;
        break;
      case "Playbook":
        url = `/dashboard/project/${id}`;
        break;
      case "Metric":
        url = `/dashboard/task/${id}`;
        break;
      default:
        console.warn(`Unrecognized tagType: ${tagType}`);
        return;
    }

    window.open(url, "_blank");
  };

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current); // Click doppio: cancella il singolo
      clickTimeoutRef.current = null;
      return;
    }

    clickTimeoutRef.current = setTimeout(() => {
      handleClick(e); // Singolo click dopo timeout → apri URL
      clickTimeoutRef.current = null;
    }, 250); // 250ms timeout: tempo standard per distinguere click vs doppio click
  };

  const handleDoubleClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current); // Impedisce il click singolo
      clickTimeoutRef.current = null;
    }
    handleDoubleClick(); // Entra in editing
  };

  return (
    <NodeViewWrapper
      className="badge-wrapper"
      style={{
        ...getVariantStyles(),
        border: `2px solid ${selected ? node.attrs.color : "transparent"}`,
        outline: "none",
        width: "fit-content",
        display: "inline-flex",
        gap: "2px",
      }}
      onClick={handleClickWrapper}
      onDoubleClick={handleDoubleClickWrapper}
    >
      <Icon name={node.attrs.icon ?? "Link"} className="mr-2" />
      {isEditing ? (
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            title="Modifica testo del badge"
            type="text"
            value={tempText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              minWidth: "60px",
              width: `${Math.max(tempText.length * 8, 60)}px`,
            }}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="badge-suggestions"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: 1000,
                background: "white",
                border: "1px solid #000",
                borderRadius: "0px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                maxHeight: "200px",
                overflowY: "auto",
                minWidth: "200px",
                marginTop: "4px",
              }}
            >
              {isLoading ? (
                <div style={{ padding: "8px 12px", color: "#6b7280" }}>
                  Caricamento...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion: SuggestionItem, index: number) => (
                  <div
                    key={suggestion.id}
                    className={`suggestion-item ${index === selectedIndex ? "selected" : ""} hover:bg-gray-100`}
                    style={{
                      margin: "8px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      backgroundColor:
                        index === selectedIndex ? "#f3f4f6" : "transparent",
                    }}
                    onMouseDown={handleMouseDown}
                    onClick={(): void => handleSuggestionClick(suggestion)}
                    onMouseEnter={(): void => handleMouseEnter(index)}
                  >
                    {suggestion.label}
                  </div>
                ))
              ) : (
                <div style={{ padding: "8px 12px", color: "#000" }}>
                  Nessun risultato trovato
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <span
          onClick={handleClickWrapper}
          onDoubleClick={handleDoubleClickWrapper}
          title="Doppio click per modificare"
        >
          {node.attrs.text}
        </span>
      )}
    </NodeViewWrapper>
  );
};

export default TagAutocomplete;
