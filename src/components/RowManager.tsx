import { Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeatingRow } from "@/types/avTypes";

interface RowManagerProps {
  rows: SeatingRow[];
  onChange: (rows: SeatingRow[]) => void;
}

export function RowManager({ rows, onChange }: RowManagerProps) {
  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const lastRow = rows[rows.length - 1];
    
    onChange([
      ...rows,
      {
        id: newId,
        distFromScreen: lastRow ? lastRow.distFromScreen + 4 : 10,
        earHeight: lastRow ? lastRow.earHeight : 44,
        riserHeight: lastRow ? lastRow.riserHeight + 8 : 0,
      },
    ]);
  };

  const removeRow = (id: number) => {
    if (rows.length > 1) {
      onChange(rows.filter((r) => r.id !== id));
    }
  };

  const updateRow = (id: number, field: keyof SeatingRow, value: number) => {
    onChange(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 rounded-lg border border-accent/20">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Seating Rows</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Configure viewing positions</p>
          </div>
        </div>
        <Button
          onClick={addRow}
          size="sm"
          className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md"
        >
          <Plus className="h-4 w-4" />
          Add Row
        </Button>
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div
            key={row.id}
            className="card-dashboard p-5 fade-in border-l-4 border-l-accent hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-accent/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent via-accent/80 to-accent/70 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <span className="text-accent-foreground font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Seating Position</span>
                  <p className="font-mono text-lg font-bold text-foreground">Row {index + 1}</p>
                </div>
              </div>
              {rows.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                  onClick={() => removeRow(row.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Distance (ft)
                </Label>
                <Input
                  type="number"
                  value={row.distFromScreen}
                  onChange={(e) =>
                    updateRow(row.id, "distFromScreen", Number(e.target.value))
                  }
                  className="input-dark font-mono h-9"
                  min={1}
                  step={0.5}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Ear Height (in)
                </Label>
                <Input
                  type="number"
                  value={row.earHeight}
                  onChange={(e) =>
                    updateRow(row.id, "earHeight", Number(e.target.value))
                  }
                  className="input-dark font-mono h-9"
                  min={30}
                  max={60}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Riser (in)
                </Label>
                <Input
                  type="number"
                  value={row.riserHeight}
                  onChange={(e) =>
                    updateRow(row.id, "riserHeight", Number(e.target.value))
                  }
                  className="input-dark font-mono h-9"
                  min={0}
                  step={1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
