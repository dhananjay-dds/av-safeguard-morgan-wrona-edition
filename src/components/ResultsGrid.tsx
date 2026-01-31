import { Check, X, AlertTriangle, Eye, Target } from "lucide-react";
import { RowAnalysis } from "@/types/avTypes";
import { cn } from "@/lib/utils";

interface ResultsGridProps {
  rows: RowAnalysis[];
}

const statusConfig = {
  optimal: {
    icon: Check,
    label: "Optimal",
    className: "status-optimal",
    bg: "bg-optimal/10 border-optimal/30",
  },
  acceptable: {
    icon: Check,
    label: "Acceptable",
    className: "status-acceptable",
    bg: "bg-acceptable/10 border-acceptable/30",
  },
  marginal: {
    icon: AlertTriangle,
    label: "Marginal",
    className: "status-marginal",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "status-warning",
    bg: "bg-warning/10 border-warning/30",
  },
  fail: {
    icon: X,
    label: "Fail",
    className: "status-fail",
    bg: "bg-fail/10 border-fail/30",
  },
};

export function ResultsGrid({ rows }: ResultsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-accent/10 rounded-lg border border-accent/20">
          <Target className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Row Analysis</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Viewing angle performance</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                Row
              </th>
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                Distance
              </th>
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                VVA
              </th>
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                HVA
              </th>
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                Sightline
              </th>
              <th className="pb-3 text-xs font-semibold text-foreground/85 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {rows.map((row, index) => {
              const config = statusConfig[row.overallStatus];
              const StatusIcon = config.icon;

              return (
                <tr key={row.rowId} className="fade-in border-b border-border/50 hover:bg-secondary/30 transition-colors" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="py-4 pl-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-md">
                        <span className="text-accent-foreground font-bold text-xs">{index + 1}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-foreground">
                        Row {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-muted-foreground">
                      {row.distFromScreen} ft
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "font-mono",
                        row.vvaPass ? "text-optimal" : "text-fail"
                      )}
                    >
                      {row.verticalViewingAngle.toFixed(1)}°
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "font-mono",
                        row.hvaPass ? "text-optimal" : "text-fail"
                      )}
                    >
                      {row.horizontalViewingAngle.toFixed(1)}°
                    </span>
                  </td>
                  <td className="py-3">
                    {row.sightlineClearance !== null ? (
                      <span
                        className={cn(
                          "font-mono font-semibold",
                          row.sightlineBlocked ? "text-fail" : "text-optimal"
                        )}
                      >
                        {row.sightlineBlocked ? (
                          <span className="flex items-center gap-1.5">
                            <X className="h-4 w-4" />
                            {row.sightlineClearance.toFixed(1)}"
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            <span className="font-bold text-lg">+</span>{row.sightlineClearance.toFixed(1)}"
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                        config.bg,
                        config.className
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row, index) => {
          const config = statusConfig[row.overallStatus];
          const StatusIcon = config.icon;

          return (
            <div
              key={row.rowId}
              className={cn(
                "card-dashboard p-4 border-l-4 fade-in hover:shadow-lg transition-all duration-300",
                row.overallStatus === "optimal" && "border-l-optimal",
                row.overallStatus === "acceptable" && "border-l-acceptable",
                row.overallStatus === "warning" && "border-l-warning",
                row.overallStatus === "fail" && "border-l-fail"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-accent/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-md">
                    <span className="text-accent-foreground font-bold text-xs">{index + 1}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-foreground">
                    Row {index + 1}
                  </span>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                    config.bg,
                    config.className
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="font-mono">{row.distFromScreen} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VVA:</span>
                  <span className={cn("font-mono", row.vvaPass ? "text-optimal" : "text-fail")}>
                    {row.verticalViewingAngle.toFixed(1)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HVA:</span>
                  <span className={cn("font-mono", row.hvaPass ? "text-optimal" : "text-fail")}>
                    {row.horizontalViewingAngle.toFixed(1)}°
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes/Issues */}
      {rows.some((r) => r.notes.length > 0) && (
        <div className="mt-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <h4 className="text-sm font-medium text-warning mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Issues Detected
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {rows.flatMap((row, i) =>
              row.notes.map((note, j) => (
                <li key={`${i}-${j}`} className="flex items-start gap-2">
                  <span className="text-warning">•</span>
                  <span>
                    <strong className="text-foreground">Row {i + 1}:</strong> {note}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
