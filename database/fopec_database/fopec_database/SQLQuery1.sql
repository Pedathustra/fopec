if exists (select name from sys.procedures where name = 'loginPerson')
begin
    drop proc loginPerson
end
go

create proc loginPerson
    @username varchar(255)
as
begin
    set nocount on;

    select
        p.id,
        p.first_name,
        p.last_name,
        p.middle_name,
        p.username,
        p.[password], -- this is a hashed password
        p.is_active
    from person p
    where p.username = @username
end
go
