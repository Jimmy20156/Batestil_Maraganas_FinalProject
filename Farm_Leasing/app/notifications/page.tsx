"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { mockNotifications } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, CreditCard, MessageSquare, Settings, CheckCheck } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function NotificationsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications.filter((n) => n.userId === user?.id))

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5" />
      case "payment":
        return <CreditCard className="h-5 w-5" />
      case "message":
        return <MessageSquare className="h-5 w-5" />
      case "system":
        return <Settings className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-blue-600"
      case "payment":
        return "text-green-600"
      case "message":
        return "text-purple-600"
      case "system":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const NotificationCard = ({ notification }: { notification: (typeof notifications)[0] }) => (
    <Card className={!notification.read ? "border-primary/50 bg-primary/5" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`mt-1 ${getIconColor(notification.type)}`}>{getIcon(notification.type)}</div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                </p>
              </div>
              {!notification.read && (
                <Badge variant="default" className="flex-shrink-0">
                  New
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {notification.link && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={notification.link}>View Details</Link>
                </Button>
              )}
              {!notification.read && (
                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your bookings and activities</p>
        </div>
        {unreadNotifications.length > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="unread" className="space-y-6">
        <TabsList>
          <TabsTrigger value="unread">
            Unread
            {unreadNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {unreadNotifications.length > 0 && (
                <>
                  <h2 className="text-lg font-semibold">Unread</h2>
                  {unreadNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </>
              )}
              {readNotifications.length > 0 && (
                <>
                  <h2 className="text-lg font-semibold mt-8">Earlier</h2>
                  {readNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
