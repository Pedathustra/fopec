if exists( select name from sys.procedures where name = 'updPerson')
begin
	drop proc updPerson
end
go

create proc updPerson
		@id int,
		@first_name varchar(255),
		@last_name varchar(255), 
		@middle_name varchar(255), 
		@username varchar(255), 
		@password varbinary(max),
		@is_active bit = 1
as 
	if exists(select * from person where username = @username)
	begin 
		return -1
	end 

	update person 
	set  first_name = @first_name,
		last_name = @last_name,
		middle_name = @middle_name,
		username = @username,
		[password] = @password,
		is_active = @is_active
	where id = @id 
	return 0
go