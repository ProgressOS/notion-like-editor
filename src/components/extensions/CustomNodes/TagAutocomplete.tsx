import React, { useState, useEffect, useRef, useCallback } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Icon } from "@/components/ui/Icon";
import axios, { AxiosResponse } from "axios";
import { icons } from "lucide-react";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import './autocomplete.css'

export enum TagAutocompleteVariant {
  Metric = "Metric",
  KpiChain = "KpiChain",
  Playbook = "Playbook",
  Team = "Team",
  User = "User",
}

// Types
interface SuggestionItem {
  id: string | number;
  name: string;
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
  const [isTooltipHovered, setIsTooltipHovered] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);
  const tooltipHideTimer = useRef<NodeJS.Timeout | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleMouseEnterWrapper = (): void => {
    if (!isEditing && node.attrs.selectedId) {
      // Cancella il timer di nascondimento se esiste
      if (tooltipHideTimer.current) {
        clearTimeout(tooltipHideTimer.current);
      }

      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(true);
      }, 300); // Ridotto a 300ms per essere più responsivo
    }
  };

  const handleMouseLeaveWrapper = (): void => {
    if (tooltipTimer.current) {
      clearTimeout(tooltipTimer.current);
    }

    // Non nascondere immediatamente se il tooltip è hovered
    if (!isTooltipHovered) {
      tooltipHideTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 200); // Delay di 200ms prima di nascondere
    }
  };

  const handleTooltipMouseEnter = (): void => {
    setIsTooltipHovered(true);
    // Cancella il timer di nascondimento
    if (tooltipHideTimer.current) {
      clearTimeout(tooltipHideTimer.current);
    }
  };

  const handleTooltipMouseLeave = (): void => {
    setIsTooltipHovered(false);
    // Nascondi il tooltip dopo un breve delay
    tooltipHideTimer.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  const handleTooltipClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    setIsTooltipHovered(false);
    handleClick(e);
  };

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
          case TagAutocompleteVariant.Team:
            paramsType = "team";
            break;
          case TagAutocompleteVariant.User:
            paramsType = "user";
            break;
          default:
            console.warn("Unrecognized tagType:", node.attrs.tagType);
            return;
        }
        const endpoint = `/api/autocomplete?q=${encodeURIComponent(query)}&type=${paramsType}&limit=5`;

        // get all cookies from page
        const cookies = document.cookie
          .split("; ")
          .reduce(
            (
              acc: Record<string, string>,
              cookie: string
            ): Record<string, string> => {
              const [key, value] = cookie.split("=");
              acc[key] = decodeURIComponent(value);
              return acc;
            },
            {}
          );

        const response: AxiosResponse<SuggestionItem[]> = await axios.get<
          SuggestionItem[]
        >(endpoint, {
          headers: {
            "Content-Type": "application/json",
            // pass cookies
            Cookie: Object.entries(cookies)
              .map(([key, value]): string => `${key}=${value}`)
              .join("; "),
          },
        });

        // Assumendo che la response sia un array di oggetti con { id, name }
        setSuggestions(
          response.data ||  []
        );
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

  useEffect((): (() => void) => {
    return (): void => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (tooltipTimer.current) {
        clearTimeout(tooltipTimer.current);
      }
      if (tooltipHideTimer.current) {
        clearTimeout(tooltipHideTimer.current);
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

  const getTooltipLabel = (): string => {
    switch (node.attrs.tagType) {
      case "KpiChain":
        return "Vai alla KPI Chain";
      case "Playbook":
        return "Vai al Playbook";
      case "Metric":
        return "Vai alla Metrica";
      case "Team":
        return "Vai al Team";
      case "User":
        return "Vai all'Utente";
      default:
        return "Vai al contenuto";
    }
  };

  const selectSuggestion = (suggestion: SuggestionItem): void => {
    updateAttributes({
      text: suggestion.name,
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
        url = `/dashboard/kpi-chain/${id}`;
        break;
      case "Playbook":
        url = `/dashboard/playbooks/${id}`;
        break;
      case "Metric":
        url = `/dashboard/kpi-books?kpiId=${id}`;
        break;
      case "Team":
        url = `/dashboard/teams/${id}`;
        break;
      case "User":
        url = `/dashboard/member/${id}`;
        break;
      default:
        console.warn(`Unrecognized tagType: ${tagType}`);
        return;
    }

    window.open(url, "_blank");
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
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnterWrapper}
      onMouseLeave={handleMouseLeaveWrapper}
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
                  Cercando...
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
                    {suggestion.name}
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
        <>
          <span
            onDoubleClick={handleDoubleClick}
            title="Doppio click per modificare"
          >
            {node.attrs.text}
          </span>
          {showTooltip && node.attrs.selectedId && (
            <div
              className="badge-tooltip"
              onClick={handleTooltipClick}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <Icon name="ExternalLink" className="h-4 w-4" />
              <span>{getTooltipLabel()}</span>
            </div>
          )}
        </>
      )}
    </NodeViewWrapper>
  );
};

export default TagAutocomplete;
